from emailFunc import enviar_notificacao, enviar_notificacao_supervisor, personalizar_html
from Conexao import pontalina

def verificar_campo_descricao():
    # 1. Obter a lista de trabalhos com status ‘Enviado para Aceite’ do banco de dados usando uma consulta SQL. pontalina(query)
    trabalhos = pontalina("SELECT * FROM [ProgramaGestao].[VW_PlanoTrabalhoAUDIN] WHERE [Situação da Atividade]='Enviado para Aceite'")
    
    # 2. Para cada trabalho na lista:
    for trabalho in trabalhos:
        servidor = trabalho['NomeServidor']
        descricao = trabalho['descricao']
        atividade = trabalho['título']
        
        # 2.1. Verificar se o campo Descrição está correto e coincide com a atividade.
        if descricao != atividade:
            # 2.2. Se houver algum erro, enviar uma notificação ao servidor e ao supervisor apontando o(s) erro(s) usando a função do arquivo Email.py com mensagem descErro.html.
            html_personalizado = personalizar_html('descErro.html', servidor)
            enviar_notificacao(servidor, html_personalizado)
            enviar_notificacao_supervisor(servidor, html_personalizado)
        else:
            # 2.3. Se tudo estiver correto, enviar o trabalho para o supervisor para análise com a mensagem descAceita.html.
            html_personalizado = personalizar_html('descAceita.html', servidor)
            enviar_notificacao_supervisor(servidor, html_personalizado)