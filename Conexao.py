import pyodbc
import json
import mysql.connector

def auditoria(query):
    with open('C:/Users/navinchandry.ruas/Documents/.git/Regras/sec/config.json', 'r') as f:
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
    
    # Return the results of the query as a list of tuples
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
    
    # Get the column names
    columns = [column[0] for column in cur.description]
    
    # Fetch the rows as a list of dictionaries
    rows = [dict(zip(columns, row)) for row in cur.fetchall()]
    
    cur.close()
    conexao.close()

    if not rows:
        return []

    return rows