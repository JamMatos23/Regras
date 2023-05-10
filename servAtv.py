import json
from Conexao import pontalina, auditoria
from emailFunc import enviar_notificacao, enviar_notificacao_supervisor
from datetime import datetime, timedelta
from extraUtils import gap , personalizar_html

def verificar_planos_trabalho():
    print('Verificando planos de trabalho...')
    # Obter a lista de servidores do banco SQL Portalina
    servidores = pontalina("SELECT [NomeServidor], [SituacaoPactoTrabalho], [pactoTrabalhoId], [DtInicioPactoTrab], [DtFimPactoTrab], [SituaçãoAtividade] FROM [ProgramaGestao].[VW_PlanoTrabalhoAUDIN] WHERE DtFimPactoTrab IN (SELECT MAX(DtFimPactoTrab) FROM [ProgramaGestao].[VW_PlanoTrabalhoAUDIN] GROUP BY NomeServidor)")
    
    # Obter a data atual
    hoje = datetime.now().date()
    # Criar uma lista vazia para armazenar os servidores que não estão com o status 'Em execução'
    servidores_notificados = []

    # Criar um dicionário vazio para armazenar os servidores que já foram notificados
    notificados = {}

    # Verificar se o arquivo notificados.json existe
    try:
        with open(gap('data\\notificados.json'), 'r') as f:
            notificados = json.load(f)
    except FileNotFoundError:
        print("Erro: o arquivo notificados.json não existe")

    # Para cada servidor na lista de servidores
    for servidor in servidores:
       
        # Verificar o status SituacaoPactoTrabalho do servidor
        if servidor['SituacaoPactoTrabalho'] != 'Em execução':
            
            # Verificar se o servidor já foi notificado
            if servidor['NomeServidor'] not in servidores_notificados:
                
                # Verificar se o servidor já foi notificado
                if servidor['NomeServidor'] in notificados:
                    # Checar se valor é maior que 1
                    if notificados[servidor['NomeServidor']]['value'] == 1:
                        print(f"E-mail de aviso já enviado para o servidor {servidor['NomeServidor']}, enviando segundo...")
                        # Enviar notificação para o servidor
                        
                        enviar_notificacao(servidor['NomeServidor'], personalizar_html(gap('mail\\avisoNCob2.html'), valores={'nome' : servidor['NomeServidor'], 'data' : datetime.now().strftime('%d/%m/%Y')}))
                        # Enviar notificação para o supervisor
                        enviar_notificacao_supervisor(servidor['NomeServidor'], personalizar_html(gap('mail\\avisoNCob2.html'), valores={'nome' : servidor['NomeServidor'], 'data' : datetime.now().strftime('%d/%m/%Y')}))
                        notificados[servidor['NomeServidor']] = {'value' : 2}
                else:
                    print(f"O servidor {servidor['NomeServidor']} não está com o status 'Em execução'")
                    # Enviar notificação para o servidor
                    enviar_notificacao(servidor['NomeServidor'], personalizar_html(gap('mail\\avisoNCob1.html'), valores={'nome' : servidor['NomeServidor'], 'data' : datetime.now().strftime('%d/%m/%Y')}))
                    notificados[servidor['NomeServidor']] = {'value' : 1}


                # Adicionar o servidor à lista de servidores notificados
                servidores_notificados.append(servidor['NomeServidor'])
                        
                with open(gap('data\\notificados.json'), 'w') as f:
                    json.dump(notificados, f)
    print('Verificação de planos de trabalho concluída')