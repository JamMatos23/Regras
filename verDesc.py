#Autor: Navin Ruas
from emailFunc import enviar_notificacao, enviar_notificacao_supervisor
from extraUtils import personalizar_html, gap, stripFunc, normalize, html_escape
from Conexao import pontalina, auditoria

def verificar_campo_descricao():
    # Obtém os dados dos servidores do banco de dados Pontalina
    dados = pontalina("SELECT DISTINCT [pactoTrabalhoId], [NomeServidor] FROM [ProgramaGestao].[VW_PlanoTrabalhoAUDIN] WHERE [SituacaoPactoTrabalho] = 'Executado' and descricao like '%<demanda>%%</demanda>%'")

    # Obtém os dados de auditoria
    depara = auditoria("SELECT * FROM eAud.`De-Para`")

    # Loop pelos dados dos servidores
    for dado in dados:
        tempConcat = ""
        bFlag = False

        # Obtém os dados temporários dos servidores
        tempDados = pontalina("SELECT [NomeServidor], [pactoTrabalhoId], [titulo], [descricao] FROM [ProgramaGestao].[VW_PlanoTrabalhoAUDIN] WHERE [pactoTrabalhoId] = '"+dado['pactoTrabalhoId']+"' ORDER BY [NomeServidor]")

        # Loop pelos dados temporários dos servidores
        for tempDado in tempDados:
            demanda = stripFunc(tempDado['descricao'], 'demanda')
            atividade = stripFunc(tempDado['descricao'], 'atividade')
            produto = stripFunc(tempDado['descricao'], 'produto')
            atividadeSISGP = tempDado['titulo']

            # Verifica se existem dados de auditoria
            if depara is not None:
                # Loop pelos dados de auditoria
                for row in depara:
                    # Verifica se a demanda, atividade e produto coincidem com os dados de auditoria
                    if row[0] == demanda and row[2] == atividade and row[4] == produto:
                        print(f"Servidor {tempDado['NomeServidor']} possui demanda, atividade e produto na ordem correta")
                        compAtv = f"{row[6]}-{row[7]} - {row[8]}"
                        # Verifica se a atividade do SISGP coincide com a atividade esperada
                        if compAtv == atividadeSISGP or normalize(compAtv) == normalize(atividadeSISGP):
                            print(f"Servidor {tempDado['NomeServidor']} possui atividade SISGP correta")
                        else:
                            # Caso contrário, adiciona o erro à variável temporária e servidor à lista de servidores com erros.
                            print(f"Servidor {tempDado['NomeServidor']} possui atividade SISGP incorreta")
                            bFlag = True
                            tempConcat += f"<br><p><b>{tempDado['titulo']}</b> - {html_escape(tempDado['descricao'])}</p><br>"
                        break
                else:
                    print(f"Servidor {tempDado['NomeServidor']} possui demanda, atividade e produto na ordem incorreta")
                    bFlag = True
                    tempConcat += f"<br><p>{tempDado['titulo']} - <b>{html_escape(tempDado['descricao'])}</b></p><br>"
                    
        # Verifica se há erros de descrição e envia notificação por e-mail
        if bFlag:
            html = personalizar_html(gap('mail\\descIncorreto.html'), {'nome': dado['NomeServidor'], 'erros': tempConcat, 'trabalhoid': dado['pactoTrabalhoId']})
            enviar_notificacao(dado['NomeServidor'], html)

        # Caso contrário, envia notificação por e-mail ao supervisor
        else:
            html = personalizar_html(gap('mail\\descCorreto.html'), {'nome': dado['NomeServidor'], 'trabalhoid': dado['pactoTrabalhoId']})
            enviar_notificacao_supervisor(dado['NomeServidor'], html)
