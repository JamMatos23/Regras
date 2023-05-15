from servAtv import verificar_plano_trabalho
from validConc import validar_conclusao_plano_trabalho
from verDesc import verificar_campo_descricao
from WebUP import webUP
from win10toast import ToastNotifier

def exibir_notificacao(titulo, mensagem, duracao=5):
    ToastNotifier().show_toast(titulo, mensagem, duration=duracao)

def ochamado():
    etapas = [
        ("Verificando Plano de Trabalho...", verificar_plano_trabalho),
        ("Verificando Conclusão do Plano de Trabalho...", validar_conclusao_plano_trabalho),
        ("Verificando Campo Descrição...", verificar_campo_descricao),
        ("Verificando Gerador Descrição Web...", webUP)
    ]

    exibir_notificacao("Integração do SharePoint e SiSGP", "Bot Iniciado com Sucesso.\nIniciando Verficações...")

    for mensagem, funcao in etapas:
        exibir_notificacao("Integração do SharePoint e SiSGP", mensagem)
        funcao()
        exibir_notificacao("Integração do SharePoint e SiSGP", mensagem.replace("Verificando", "Verificação do(a)") + " Concluída")

    exibir_notificacao("Integração do SharePoint e SiSGP", "Verificações Concluídas")
    exibir_notificacao("Integração do SharePoint e SiSGP", "Bot Finalizado com Sucesso")

    return

