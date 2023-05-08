import json
from datetime import datetime, timedelta
from Conexao import pontalina, auditoria
from emailFunc import enviar_notificacao, enviar_notificacao_supervisor

def verificar_plano_trabalho():
    # 1. Lista servidores do banco SQL. Portalina
    servidores = pontalina("SELECT * FROM(servidores)")

    # 1,5. Verificar Lista de Férias no SQL. Auditor
    ferias = auditoria("SELECT * FROM(ferias)")

    # Carregar lista de servidores notificados
    with open('notificados.json', 'r') as f:
        notificados = json.load(f)

    if servidores is not None:
        for servidor in servidores:
            # 2.5. Caso Servidor em Férias Ativo, ignorar...
            if servidor in ferias:
                continue

            # 2. Verificar status StuacaoPactoTrabalho de cada servidor
            situacao = pontalina(f"SELECT SituacaoPactoTrabalho FROM(servidores) WHERE(servidor='{servidor}')")

            # 3. Caso SituacaoPactoTrabalho = '' 'Rejeitado' 'Rascunho' 'Executado' {Enviar Notificação}
            if situacao in ['', 'Rejeitado', 'Rascunho', 'Executado']:
                if servidor not in notificados:
                    # Enviar primeiro aviso
                    html_personalizado = personalizar_html('avisoNCob1.html', servidor)
                    enviar_notificacao(servidor, html_personalizado)
                    notificados[servidor] = {'avisos': 1, 'data_primeiro_aviso': str(datetime.now())}
                elif notificados[servidor]['avisos'] == 1:
                    data_primeiro_aviso = datetime.strptime(notificados[servidor]['data_primeiro_aviso'], '%Y-%m-%d %H:%M:%S.%f')
                    if datetime.now() - data_primeiro_aviso > timedelta(days=2):
                        # Enviar segundo aviso
                        html_personalizado = personalizar_html('avisoNCob2.html', servidor)
                        enviar_notificacao(servidor, html_personalizado)
                        enviar_notificacao_supervisor(servidor, html_personalizado)
                        notificados[servidor]['avisos'] = 2

    # Salvar lista atualizada de servidores notificados
    with open('notificados.json', 'w') as f:
        json.dump(notificados, f)

def personalizar_html(arquivo_html, servidor):
    with open(arquivo_html, 'r') as f:
        html = f.read()
    html_personalizado = html.replace('{servidor}', servidor)
    return html_personalizado