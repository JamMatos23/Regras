import pandas as pd
import openpyxl
import pyodbc
import math
import win32com.client as win32
from Reverso import descTrans

'''# Criando um dataframe de exemplo
df = pd.DataFrame({"titulo": ["T1", "T2", "T3"], "descricao": ["<demanda>2</demanda><atividade>1</atividade><produto>3</produto>", "<demanda>1</demanda><atividade>2</atividade><produto>1</produto>", "<demanda>3</demanda><atividade>3</atividade><produto>2</produto>"]})'''

# Fazer a conexão com a base de dados
dadosconexao = (
    "Driver={SQL Server};"
    "Server=Pontalina.inep.gov.br;"
    "Database=PGD_SUSEP_PROD;"
    "Trusted_Connection=yes;"
)

# Verificar se a conexão deu certo
conexao = pyodbc.connect(dadosconexao)
print("conexão bem sucedida!")

#área onde acontecerar a pesquisa
df = pd.read_sql_query(f"SELECT NomeServidor, DtInicioPactoTrab, titulo as Título, left(descricao, 200) as Descrição FROM [ProgramaGestao].[VW_PlanoTrabalhoAUDIN] where descricao like '%<demanda>%%</demanda>%<atividade>%%</atividade><produto>%%</produto><anoAcao>%%</anoAcao><idAcao>%%</idAcao><idSprint>%%</idSprint>%' and DtInicioPactoTrab BETWEEN DATEADD (DAY, 1, EOMONTH (GETDATE (), -1)) and GETDATE () and SituacaoPactoTrabalho != 'Executado' and SituacaoPactoTrabalho != 'Rejeitado' group by NomeServidor, DtInicioPactoTrab, left(descricao, 200), titulo order by NomeServidor, DtInicioPactoTrab", conexao)
#print(df)

# Lendo a planilha excel como um dataframe
planilha = pd.read_excel("C://Users\jamil.monteiro\OneDrive - INEP\Documents\Projeto\Site\De-Para codificada.xlsx", header=1)
#print(planilha['CodDemanda'].values)
#print(planilha['CodAtividade'].values)
#print(planilha['CodProduto'].values)
#print(planilha)

# Definindo uma função que verifica se a descrição corresponde às colunas da planilha
def verificar_descricao(descricao):
  # Extraindo a parte da descrição que interessa
  descricao = descricao.split("</produto>")[0] + "</produto>"
  # Extraindo os valores de demanda, atividade e produto da descricao
  demanda = descricao.split("<demanda>")[-1].split("</demanda>")[0]
  atividade = descricao.split("<atividade>")[-1].split("</atividade>")[0]
  produto = descricao.split("<produto>")[-1].split("</produto>")[0]
  
  # Lendo o arquivo excel em um dataframe
  dfs = pd.read_excel("C://Users\jamil.monteiro\OneDrive - INEP\Documents\Projeto\Site\De-Para codificada.xlsx", sheet_name="de-para",header=1)
  # Criando um dicionário que mapeia a chave para os valores das colunas 1,4 e 7
  dap = dfs.set_index("index")[["CodDemanda", "CodAtividade", "CodProduto"]].to_dict(orient="index")
  # Criando um dicionário para pegar os valores das colunas 10 e 11
  ana = dfs.set_index("index")[["Atividade2", "nº da atividade"]].to_dict(orient="index")
  # Criando a chave a partir dos valores de demanda, atividade e produto da descrição
  chave = '&'.join([str(demanda), str(atividade), str(produto)])
  # Criando uma lista vazia para armazenar as novas chaves de dic
  plan_ana = []
  plan_dap = []

  for k in ana:
    atividade2 = ana[k]["Atividade2"]
    numero = ana[k]["nº da atividade"]
    
    if math.isnan(numero):
        numero = 0
    else:
        numero = int(numero)
    
    if numero > 9 or numero == 0:
      plan_a = "%s-%d" % (atividade2, numero) # Não usa o zero à esquerda
    else:
      plan_a = "%s-0%d" % (atividade2, numero) # Usa o zero à esquerda
    plan_ana.append(str(plan_a))
    plan_ana = [x.upper() for x in plan_ana]

  # Percorrendo as chaves de dap
  for k in dap:
    # Obtendo os valores de demanda, atividade e produto de cada chave
    demanda = dap[k]['CodDemanda']
    atividade = dap[k]['CodAtividade']
    produto = dap[k]['CodProduto']
    
    # Verificando se os valores são NaN
    if math.isnan(demanda):
        demanda = 0
    else:
        demanda = int(demanda)
    
    if math.isnan(atividade):
        atividade = 0
    else:
        atividade = int(atividade)
    
    if math.isnan(produto):
        produto = 0
    else:
        produto = int(produto)
    
    # Concatenando os valores com o caractere '&' e adicionando à lista de novas chaves
    plan_d = '&'.join([str(demanda), str(atividade), str(produto)])
    plan_dap.append(str(plan_d))
    plan_dap = [x.upper() for x in plan_dap]
  
  df6 = df['Título'].str.slice(0,6)
  #print("Df(Todos os valores do campo Descrição):",df["Descrição"].values)
  #print("Df6(Todos os valores do campo Título): ",df6.values) #Isso que eu vou usar
  #print("Plan_ana(Valores possiveis SISGP dentro do de-para): ",str(plan_ana))
  #print("Plan_dap(Valores possiveis Sharepoint dentro do de-para): ",plan_dap)
  #print("Plan_a(Ultimo valor pego no campo titulo): ",str(plan_a))
  #print("Plan_d(Ultimo valor pego no campo descrição): ",plan_d)
  print("Chave(Valor pego no campo descrição): ", chave)
  #print("Dap: ", dap)
  #print("Ana:", ana)
  if chave in plan_dap and any(df6.isin(plan_ana)):
    print("Teoricamente, o valor registrado no campo descrição está descrevendo corretamente o item colocado no campo titulo, isso de acordo com a verificação feita pelo de-para ")
  else:
    print("Poise é meu filho acho que você errou")
  # Verificando se a chave existe no dicionário
  '''if chave in plan_dap:
    valor = "Ok, a chave existe dentro do Sharepoint"
    print(valor)
    if any(df6.isin(plan_ana)):
      # criar a integração com o outlook
      outlook = win32.Dispatch('outlook.application')
      
      # criar um email
      email = outlook.CreateItem(0)
      email.To = f"jamil.monteiro@inep.gov.br"
      email.Subject = "Lembrete"
      email.HTMLBody = f"""
      <p>Lembrete: Prezado(a) servidor(a). Informo que .</p>
      <p>Cordialmente,</p>
      <p>Email automático</p>
      """
      email.Send()
      #print("Plan_a(Ultimo valor pego no campo titulo): ", plan_a)
      valor = "Ok, a chave existe dentro do Sharepoint e do SISGP"
      print(valor)
      #if any(df6)
    else:
      # criar a integração com o outlook
      outlook = win32.Dispatch('outlook.application')
      
      # criar um email
      email = outlook.CreateItem(0)
      email.To = f"jamil.monteiro@inep.gov.br"
      email.Subject = "Lembrete"
      email.HTMLBody = f"""
      <p>Lembrete: Prezado(a) servidor(a). Informo que .</p>
      <p>Cordialmente,</p>
      <p>Email automático</p>
      """
      email.Send()
      valor = "Ok, a chave não existe dentro do Sharepoint e do SISGP"
      print(valor)
  else:
      # Retornando um valor padrão
      valor = "Ok, a chave não existe"
      print(valor)
  return valor'''

resultado = df["Descrição",'Título'].apply(verificar_descricao)
#if any(df['Título'].values) == resultado:
  #print()

#Imprimindo o resultado
#print(resultado)
#Código para o excel
#=ÍNDICE (A:D; CORRESP ("<demanda>2</demanda><atividade>1</atividade><produto>3</produto>"; A:A & B:B & C:C; 0); 4)
