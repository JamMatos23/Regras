import pyodbc
import json
import mysql.connector
from extraUtils import gap

def auditoria(query):
    with open(gap("sec\\config.json"), 'r') as f:
        config = json.load(f)
    conn = mysql.connector.connect(
        host=config['dbHost'],
        port=config['dbPort'],
        user=config['dbUsername'],
        password=config['dbPassword'],
        database=config['dbName']
    )
    cur = conn.cursor()
    cur.execute(query)
    print("Conexão ao Banco de Dados SQL/Auditoria foi bem sucedida!")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    
    # Retorna os resultados da query como uma lista de tuplas
    return rows

def pontalina(query):
    dadosconexao = (
        "Driver={SQL Server};"
        "Server=Pontalina.inep.gov.br;"
        "Database=PGD_SUSEP_PROD;"
        "Trusted_Connection=yes;"
    )
    conexao = pyodbc.connect(dadosconexao)
    print("Conexão ao Banco de Dados SQL/Pontalina foi bem sucedida!")
    cur = conexao.cursor()
    cur.execute(query)
    
    # Pegar os nomes das colunas
    columns = [column[0] for column in cur.description]
    
    # Combinar as linhas como uma lista de dicionarios
    rows = [dict(zip(columns, row)) for row in cur.fetchall()]
    
    cur.close()
    conexao.close()

    if not rows:
        return []

    return rows