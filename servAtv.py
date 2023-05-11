import json
from Conexao import pontalina
from emailFunc import enviar_notificacao, enviar_notificacao_supervisor
from extraUtils import gap

def verificar_plano_trabalho():
    # Obter a lista de servidores do banco SQL Portalina
    servidores = pontalina("SELECT [NomeServidor], [SituacaoPactoTrabalho], [pactoTrabalhoId], [DtInicioPactoTrab], [DtFimPactoTrab], [SituaçãoAtividade] FROM [ProgramaGestao].[VW_PlanoTrabalhoAUDIN] WHERE DtFimPactoTrab IN (SELECT MAX(DtFimPactoTrab) FROM [ProgramaGestao].[VW_PlanoTrabalhoAUDIN] GROUP BY NomeServidor) order by NomeServidor")

    # Carregar o arquivo notificado.json
    with open(gap('data\\notificados.json'), 'r') as f:
        notificado = json.load(f)

    temp = {}

    # Para cada servidor
    for servidor in servidores:
        nome_servidor = servidor['NomeServidor']
        situacao_pacto_trabalho = servidor['SituacaoPactoTrabalho']

        # Verificar se há algum pactoTrabalho 'Em execução'
        em_execucao = False
        if situacao_pacto_trabalho == 'Em execução':
            em_execucao = True
            if nome_servidor in notificado:
                del notificado[nome_servidor]
            continue

        # Se nenhum pactoTrabalho estiver 'Em execução' e o servidor ainda não foi notificado, notificar o servidor e adicionar ao arquivo json
        if not em_execucao and nome_servidor not in notificado:
            enviar_notificacao(nome_servidor, gap('mail\\avisoNCob1.html'))
            notificado[nome_servidor] = 1
            temp[nome_servidor] = True

        if notificado[nome_servidor] == 1 and nome_servidor not in temp:
            enviar_notificacao(nome_servidor, gap('mail\\avisoNCob2.html'))
            enviar_notificacao_supervisor(nome_servidor, gap('mail\\avisoNCob2.html'))
            notificado[nome_servidor] = 2

    # Salvar o arquivo notificado.json
    with open(gap('data\\notificados.json'), 'w') as f:
        json.dump(notificado, f)

if __name__ == '__main__':
    verificar_plano_trabalho()
