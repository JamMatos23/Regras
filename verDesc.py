from emailFunc import enviar_notificacao, enviar_notificacao_supervisor
from extraUtils import personalizar_html, gap, stripFunc
from Conexao import pontalina, auditoria

def verificar_campo_descricao():
    dados = pontalina("SELECT [NomeServidor], [pactoTrabalhoId], [titulo], [descricao] FROM [ProgramaGestao].[VW_PlanoTrabalhoAUDIN] WHERE [SituacaoPactoTrabalho] = 'Executado' and descricao like '%<demanda>%%</demanda>%'")
    depara = auditoria("SELECT * FROM eAud.`De-Para`")

    for dado in dados:
        demanda = stripFunc(dado['descricao'], 'demanda')
        atividade = stripFunc(dado['descricao'], 'atividade')
        produto = stripFunc(dado['descricao'], 'produto')

        # Check if the order of demanda, atividade, and produto is valid
        if depara is not None:
            for row in depara:
                # Use integer indices to access the elements of the row tuple
                if row[0] == demanda and row[2] == atividade and row[4] == produto:
                    # The order is valid
                    print(f"Servidor {dado['NomeServidor']} possui demanda, atividade e produto na ordem correta")
                    break
            else:
                print(f"Servidor {dado['NomeServidor']} possui demanda, atividade e produto na ordem incorreta")
                # The order is not valid
                # Do something here
                pass


if __name__ == '__main__':
    verificar_campo_descricao()
