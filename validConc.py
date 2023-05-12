import json
from datetime import datetime
from emailFunc import enviar_notificacao, enviar_notificacao_supervisor
from extraUtils import personalizar_html, gap
from Conexao import pontalina

def validar_conclusao_plano_trabalho():
    print("\n\n\nValidando conclusão do plano de trabalho...")
    # 1. Obter dados do SQL usando a consulta SELECT *.
    print("Obtendo dados do SQL...")
    dados = pontalina("SELECT [NomeServidor], [SituacaoPactoTrabalho], [pactoTrabalhoId], [DtInicioPactoTrab], [DtFimPactoTrab], [SituaçãoAtividade] FROM [ProgramaGestao].[VW_PlanoTrabalhoAUDIN] WHERE DtFimPactoTrab IN (SELECT MAX(DtFimPactoTrab) FROM [ProgramaGestao].[VW_PlanoTrabalhoAUDIN] GROUP BY NomeServidor) order by NomeServidor")

    nConc = {}

    # Carregar lista de servidores não concluídos
    with open(gap('data\\nConc.json'), 'r') as f:
        nConc = json.load(f)

    for dado in dados:
        if dado['SituacaoPactoTrabalho'] == 'Em execução' and dado['SituaçãoAtividade'] != 'Concluído':
            date_string = dado['DtFimPactoTrab']
            date_format = '%Y-%m-%d' # specify the format of the date string
            date_object = datetime.strptime(date_string, date_format)

            if dado['NomeServidor'] not in nConc:
                today = datetime(2023, 5, 15).date()
                if date_object.date() == today:
                    # Enviar notificaçoa vence hoje
                    print(f"Servidor {dado['NomeServidor']} está com pacto de trabalho em execução e vence hoje")
                    html = personalizar_html(gap('mail\\avisoConc1.html'), {'nome': dado['NomeServidor'], 'data':date_object.strftime('%d/%m/%Y'), 'trabalhoid': dado['pactoTrabalhoId']})
                    enviar_notificacao(dado['NomeServidor'], html)
                    nConc[dado['NomeServidor']] = True 
                elif date_object.date() < today:
                    # Já venceu
                    print(f"Servidor {dado['NomeServidor']} está com pacto de trabalho em execução e já venceu")
                    html = personalizar_html(gap('mail\\avisoNConc.html'), {'nome': dado['NomeServidor'], 'data':date_object.strftime('%d/%m/%Y'), 'trabalhoid': dado['pactoTrabalhoId']})
                    enviar_notificacao(dado['NomeServidor'], html)
                    enviar_notificacao_supervisor(dado['NomeServidor'], html)
                    nConc[dado['NomeServidor']] = True

    print("Salvando lista atualizada de servidores não concluídos...")
    # Salvar lista atualizada de servidores não concluídos
    with open(gap('data\\nConc.json'), 'w') as f:
        json.dump(nConc, f)
    print("Lista atualizada de servidores não concluídos salva com sucesso\n")
    print("Conclusão do plano de trabalho validada com sucesso\n\n\n")