import smtplib
from Conexao import pontalina
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

def enviar_notificacao(servidor, arquivo_html):
    # Obter o endereço de email do servidor
    email_servidor = pontalina(f"SELECT email FROM(servidores) WHERE(servidor='{servidor}')")

    # Criar mensagem de email
    msg = MIMEMultipart()
    msg['From'] = 'seu_email@dominio.com'
    msg['To'] = email_servidor
    msg['Subject'] = 'Notificação de Plano de Trabalho'

    # Adicionar conteúdo HTML à mensagem
    with open(arquivo_html, 'r') as f:
        html = f.read()
    msg.attach(MIMEText(html, 'html'))

    # Enviar email
    with smtplib.SMTP('seu_servidor_smtp', 587) as server:
        server.starttls()
        server.login('seu_usuario', 'sua_senha')
        server.send_message(msg)

def enviar_notificacao_supervisor(servidor, arquivo_html):
    # Obter o endereço de email do supervisor do servidor
    email_supervisor = pontalina(f"SELECT supervisor FROM(servidores) WHERE(servidor='{servidor}')")

    # Criar mensagem de email
    msg = MIMEMultipart()
    msg['From'] = 'seu_email@dominio.com'
    msg['To'] = email_supervisor
    msg['Subject'] = 'Notificação de Plano de Trabalho'

    # Adicionar conteúdo HTML à mensagem
    with open(arquivo_html, 'r') as f:
        html = f.read()
    msg.attach(MIMEText(html, 'html'))

    # Enviar email
    with smtplib.SMTP('seu_servidor_smtp', 587) as server:
        server.starttls()
        server.login('seu_usuario', 'sua_senha')
        server.send_message(msg)

def personalizar_html(arquivo_html, valores):
    with open(arquivo_html, 'r') as f:
        html = f.read()
    for chave, valor in valores.items():
        html = html.replace('{' + chave + '}', str(valor))
    return html