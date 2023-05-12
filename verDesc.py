from emailFunc import enviar_notificacao, enviar_notificacao_supervisor
from extraUtils import personalizar_html, gap, stripFunc, normalize, html_escape
from Conexao import pontalina, auditoria

def verificar_campo_descricao():
    dados = pontalina("SELECT DISTINCT [pactoTrabalhoId], [NomeServidor] FROM [ProgramaGestao].[VW_PlanoTrabalhoAUDIN] WHERE [SituacaoPactoTrabalho] = 'Executado' and descricao like '%<demanda>%%</demanda>%'")
    depara = auditoria("SELECT * FROM eAud.`De-Para`")


    for dado in dados:

        tempConcat = f""

        bFlag = False

        tempDados = pontalina("SELECT [NomeServidor], [pactoTrabalhoId], [titulo], [descricao] FROM [ProgramaGestao].[VW_PlanoTrabalhoAUDIN] WHERE [pactoTrabalhoId] = '"+dado['pactoTrabalhoId']+"' ORDER BY [NomeServidor]")
        for tempDado in tempDados:
            demanda = stripFunc(tempDado['descricao'], 'demanda')
            atividade = stripFunc(tempDado['descricao'], 'atividade')
            produto = stripFunc(tempDado['descricao'], 'produto')
            atividadeSISGP = tempDado['titulo']

            # Check if the order of demanda, atividade, and produto is valid
            if depara is not None:
                for row in depara:
                    # Use integer indices to access the elements of the row tuple
                    if row[0] == demanda and row[2] == atividade and row[4] == produto:
                        # The order is valid
                        print(f"Servidor {tempDado['NomeServidor']} possui demanda, atividade e produto na ordem correta")
                        compAtv = f"{row[6]}-{row[7]} - {row[8]}"
                        if compAtv == atividadeSISGP or normalize(compAtv) == normalize(atividadeSISGP):
                            print(f"Servidor {tempDado['NomeServidor']} possui atividade SISGP correta")
                            pass

                        else:
                            print(f"Servidor {tempDado['NomeServidor']} possui atividade SISGP incorreta")

                            bFlag = True

                            tempConcat += f"<br><p><b>" + f"{tempDado['titulo']}" + f"</b> - " + html_escape(f"{tempDado['descricao']}") + f"</p><br>"
                            pass

                        break
                else:
                    print(f"Servidor {tempDado['NomeServidor']} possui demanda, atividade e produto na ordem incorreta")

                    bFlag = True

                    tempConcat += f"<br><p>" + f"{tempDado['titulo']}" + f" - <b>" + html_escape(f"{tempDado['descricao']}") + f"</b></p><br>"
                    pass
        if bFlag:
            html = personalizar_html(gap('mail\\descIncorreto.html'), {'nome': dado['NomeServidor'], 'erros': tempConcat, 'trabalhoid': dado['pactoTrabalhoId']})
            enviar_notificacao(dado['NomeServidor'], html)
            pass
        elif not bFlag:
            html = personalizar_html(gap('mail\\descCorreto.html'), {'nome': dado['NomeServidor'], 'trabalhoid': dado['pactoTrabalhoId']})
            enviar_notificacao_supervisor(dado['NomeServidor'], html)
            pass