import json
from Conexao import pontalina, auditoria
from emailFunc import enviar_notificacao, enviar_notificacao_supervisor
from datetime import datetime, timedelta
from extraUtils import gap , personalizar_html

def verificar_planos_trabalho():
    print('Verificando planos de trabalho...')
    # Obter a lista de servidores do banco SQL Portalina
    servidores = pontalina("SELECT * FROM [ProgramaGestao].[VW_PlanoTrabalhoAUDIN]")

    # Obter a lista de férias do banco SQL Auditor
    ferias = auditoria("SELECT * FROM Ferias")

    # Verificar se a variável ferias é None
    if ferias is None:
        print("Erro: a função auditoria('SELECT * FROM Ferias') retornou None")
        return

    # Verificar se a variável ferias é iterável
    if not isinstance(ferias, (list, tuple)):
        print(f"Erro: a função auditoria('SELECT * FROM Ferias') retornou um valor não iterável: {ferias}")
        return

    # Obter a data atual
    hoje = datetime.now().date()

    # Criar uma lista vazia para armazenar os nomes dos servidores em férias
    servidores_em_ferias = []

    # Iterar sobre a lista de férias
    for ferias_servidor in ferias:
        # Obter o nome do servidor
        nome_servidor = ferias_servidor[0]
        
        # Iterar sobre os períodos de férias do servidor
        for i in range(1, len(ferias_servidor), 2):
            # Obter a data de início e a duração do período de férias
            data_inicio_str = ferias_servidor[i]
            duracao_str = ferias_servidor[i+1]
            
            # Verificar se data_inicio_str e duracao_str não estão vazios
            if data_inicio_str and duracao_str:
                # Converter data_inicio_str para um objeto datetime
                data_inicio = datetime.strptime(data_inicio_str, '%d/%m/%Y').date()
                
                # Converter duracao_str para um inteiro
                duracao = int(duracao_str)
                
                # Calcular a data de término do período de férias
                data_termino = data_inicio + timedelta(days=duracao)
                
                # Verificar se hoje está dentro do período de férias
                if data_inicio <= hoje <= data_termino:
                    # Adicionar o nome do servidor à lista servidores_em_ferias
                    servidores_em_ferias.append(nome_servidor)
                    break

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
        # Verificar se o servidor está na lista de férias
        if servidor['NomeServidor'] in servidores_em_ferias:
            continue

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