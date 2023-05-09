import json
from Conexao import pontalina, auditoria
from emailFunc import enviar_notificacao, enviar_notificacao_supervisor, personalizar_html

def verificar_planos_trabalho():
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

    # Verificar se o arquivo notificado.json existe
    try:
        with open('notificado.json', 'r') as f:
            notificados = json.load(f)
    except FileNotFoundError:
        notificados = {}

    # Para cada servidor na lista de servidores
    for servidor in servidores:
        # Verificar se a variável ferias é None
        if ferias is not None:
            # Verificar se o servidor está na lista de férias
            if any(servidor['servidor'] == ferias_servidor['servidor'] for ferias_servidor in ferias):
                continue

            # Verificar o status SituacaoPactoTrabalho do servidor
            if servidor['SituacaoPactoTrabalho'] != 'Em execução':
                # Verificar se o servidor já foi notificado anteriormente
                if servidor['servidor'] not in notificados:
                    # Enviar o primeiro aviso ao servidor
                    enviar_notificacao(servidor['servidor'], 'avisoNCob1.html')
                    # Registrar no arquivo notificado.json que o servidor foi notificado uma vez
                    notificados[servidor['servidor']] = 1
                elif notificados[servidor['servidor']] == 1:
                    # Enviar o segundo aviso ao servidor e ao supervisor
                    enviar_notificacao(servidor['servidor'], 'avisoNCob2.html')
                    enviar_notificacao_supervisor(servidor['servidor'], 'avisoNCob2.html')
                    # Registrar no arquivo notificado.json que o servidor foi notificado duas vezes
                    notificados[servidor['servidor']] = 2

    # Salvar o arquivo notificado.json
    with open('notificado.json', 'w') as f:
        json.dump(notificados, f)

if __name__ == '__main__':
    verificar_planos_trabalho()