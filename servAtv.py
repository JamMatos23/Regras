import json
from Conexao import pontalina
from datetime import datetime
from emailFunc import enviar_notificacao, enviar_notificacao_supervisor
from extraUtils import gap, personalizar_html

def verificar_plano_trabalho():
    print("Verificando plano de trabalho...")
    print("Obtendo lista de servidores...")
    # Obter a lista de servidores do banco SQL Portalina
    servidores = pontalina("SELECT [NomeServidor], [SituacaoPactoTrabalho], [pactoTrabalhoId], [DtInicioPactoTrab], [DtFimPactoTrab], [SituaçãoAtividade] FROM [ProgramaGestao].[VW_PlanoTrabalhoAUDIN] WHERE DtFimPactoTrab IN (SELECT MAX(DtFimPactoTrab) FROM [ProgramaGestao].[VW_PlanoTrabalhoAUDIN] GROUP BY NomeServidor) order by NomeServidor")


    print("Carregando arquivo notificado.json...")
    # Carregar o arquivo notificado.json
    with open(gap('data\\notificados.json'), 'r') as f:
        notificado = json.load(f)

    temp = {}

    # Para cada servidor
    print("Verificando situação de cada servidor...")
    for servidor in servidores:
        nome_servidor = servidor['NomeServidor']
        situacao_pacto_trabalho = servidor['SituacaoPactoTrabalho']

        # Verificar se há algum pactoTrabalho 'Em execução'
        em_execucao = False
        if situacao_pacto_trabalho == 'Em execução':
            print(f"Servidor {nome_servidor} está com pacto de trabalho em execução")
            em_execucao = True
            if nome_servidor in notificado:
                del notificado[nome_servidor]
            continue

        # Se nenhum pactoTrabalho estiver 'Em execução' e o servidor ainda não foi notificado, notificar o servidor e adicionar ao arquivo json
        if not em_execucao and nome_servidor not in notificado:
            print(f"Servidor {nome_servidor} não possui pacto de trabalho em execução")
            html = personalizar_html(gap('mail\\avisoNCob1.html'), {'nome': nome_servidor, 'data': datetime.now().strftime('%d/%m/%Y')})
            enviar_notificacao(nome_servidor, html)
            notificado[nome_servidor] = 1
            temp[nome_servidor] = True

        if notificado[nome_servidor] == 1 and nome_servidor not in temp:
            print(f"Servidor {nome_servidor} não possui pacto de trabalho em execução e já foi notificado uma vez")
            html = personalizar_html(gap('mail\\avisoNCob2.html'), {'nome': nome_servidor, 'data': datetime.now().strftime('%d/%m/%Y'), 'supervisor': 'Cleuber Fernandes'})
            enviar_notificacao(nome_servidor, html)
            enviar_notificacao_supervisor(nome_servidor, html)
            notificado[nome_servidor] = 2

    # Salvar o arquivo notificado.json
    with open(gap('data\\notificados.json'), 'w') as f:
        json.dump(notificado, f)
    print("Verificação de plano de trabalho concluída com sucesso!")

