
import win32com.client as win32
from extraUtils import corrigir_codificacao

def enviar_notificacao(servidor, html):

    html_corrigido = corrigir_codificacao(html)

    # Obter o endereço de email do servidor
    email_servidor = "jamil.monteiro@inep.gov.br"
    #email_servidor = "navinchandry.ruas@inep.gov.br"

    print('Enviando notificação ao servidor... ' + servidor)

    # Criar mensagem de email
    subject = 'Notificação de Plano de Trabalho'

    # Criar a integração Outlook
    outlook = win32.Dispatch('outlook.application')

    # Criar um novo email
    email = outlook.CreateItem(0)

    # Definir as propriedades do email
    email.Subject = subject
    email.BodyFormat = 2 # 2: olFormatHTML
    email.HTMLBody = html_corrigido
    email.To = email_servidor

    # Enviar o email
    try:
        email.Send()
        print('Email enviado com sucesso!')
    except Exception as e:
        print(f'Error: Failed to send email: {e}')

def enviar_notificacao_supervisor(servidor, html):

    html_corrigido = corrigir_codificacao(html)

    # Obter o endereço de email do supervisor do servidor
    email_supervisor = "jamil.monteiro@inep.gov.br"
    #email_supervisor = "navinchandry.ruas@inep.gov.br"


    # Criar mensagem de email
    subject = 'Sup Notificação de Plano de Trabalho'

    # Criar a integração Outlook
    outlook = win32.Dispatch('outlook.application')

    # Criar um novo email
    email = outlook.CreateItem(0)

    # Definir as propriedades do email
    email.Subject = subject
    email.BodyFormat = 2 # 2: olFormatHTML
    email.HTMLBody = html_corrigido
    email.To = email_supervisor

    # Enviar o email
    try:
        email.Send()
        print('Email enviado com sucesso!')
    except Exception as e:
        print(f'Error: Failed to send email: {e}')
