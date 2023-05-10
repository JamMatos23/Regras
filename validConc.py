import json
from datetime import datetime
from emailFunc import enviar_notificacao, enviar_notificacao_supervisor
from extraUtils import personalizar_html, gap
from Conexao import pontalina

def validar_conclusao_plano_trabalho():
    # 1. Obter dados do SQL usando a consulta SELECT *.
    dados = pontalina("SELECT * FROM [ProgramaGestao].[VW_PlanoTrabalhoAUDIN]")
    
    # 2. Separar os dados por servidor e verificar o status mais recente de SituacaoPactoTrabalho para cada servidor.
    servidores = {}
    for dado in dados:
        servidor = dado['NomeServidor']
        if servidor not in servidores:
            servidores[servidor] = []
        servidores[servidor].append(dado)
    
    # Carregar lista de servidores não concluídos
    with open(gap('data\\nConc.json'), 'r') as f:
        nConc = json.load(f)
    
    # 3. Para cada servidor:
    for servidor, atividades in servidores.items():
        todas_concluidas = all(atividade['SituacaoAtividade'] == 'Concluída' for atividade in atividades)
        
        # 3.1. Se todas as atividades com o mesmo pactoTrabalhoId tiverem status Concluída, ignorar e passar para o próximo servidor.
        if todas_concluidas:
            continue
        
        # Verificar se a data DtFimPactoTrab está próxima ou já passou
        dtFimPactoTrab = min(datetime.strptime(atividade['DtFimPactoTrab'], '%Y-%m-%d') for atividade in atividades)
        dias_restantes = (dtFimPactoTrab - datetime.now()).days
        
        # 3.2. Se a data DtFimPactoTrab estiver faltando 1 dia para vencer, enviar uma notificação ao servidor usando o arquivo HTML avisoConc1.html.
        if dias_restantes == 1:
            enviar_notificacao(servidor, personalizar_html(gap('mail\\avisoConc1.html'), {'nome': servidor, 'data' : datetime.now().strftime('%d/%m/%Y')}))
        
        # 3.3. Se a data DtFimPactoTrab já estiver vencida, enviar uma notificação ao servidor e ao supervisor usando o arquivo HTML avisoNConc.html.
        elif dias_restantes < 0:
            enviar_notificacao(servidor, personalizar_html(gap('mail\\avisoNConc.html'), {'nome': servidor, 'data' : datetime.now().strftime('%d/%m/%Y')}))
            enviar_notificacao_supervisor(servidor, personalizar_html(gap('mail\\avisoNConc.html'), {'nome': servidor}))
            
            # 3.4. Adicionar o servidor à lista de servidores não concluídos em um arquivo nConc.json.
            if servidor not in nConc:
                nConc[servidor] = {'data_primeiro_aviso': str(datetime.now())}
    
    # 3.5. Verificar se os servidores na lista já concluíram as atividades. Caso tenham concluído, remover da lista.
    for servidor in list(nConc.keys()):
        atividades = servidores.get(servidor, [])
        todas_concluidas = all(atividade['SituacaoAtividade'] == 'Concluída' for atividade in atividades)
        if todas_concluidas:
            del nConc[servidor]
    
    # Salvar lista atualizada de servidores não concluídos
    with open(gap('data\\nConc.json'), 'w') as f:
        json.dump(nConc, f)

if __name__ == '__main__':
    validar_conclusao_plano_trabalho()