import os
import json
import mysql.connector
from datetime import datetime

def update_ano_json():
    current_year = str(datetime.now().year)
    repo_path = None

    # Locate the Gerador-Desc repository on the user's disk
    for root, dirs, files in os.walk(os.path.expanduser("~")):
        if '.git' in dirs and os.path.basename(root) == 'Gerador-Desc':
            repo_path = root
            break

    if not repo_path:
        print("Repositório Gerador-Desc não encontrado no disco do usuário.")
        return

    # Load the ano.json file
    with open(os.path.join(repo_path, 'ano.json'), 'r') as f:
        data = json.load(f)

    # Check if the current year is in the data
    years = [item['value'] for item in data]
    if current_year not in years:
        # Add the current year and remove the smallest year value
        data.append({'value': current_year, 'text': current_year})
        min_year = min([int(year) for year in years if year.isdigit()])
        data = [item for item in data if not item['value'].isdigit() or int(item['value']) != min_year]

        # Update the ano.json file
        with open(os.path.join(repo_path, 'ano.json'), 'w') as f:
            json.dump(data, f)
        print("Ano Do Gerador Foi Atualizado!")
    else:
        print("Ano Do Gerador Está Atualizado")

def update_depara_json():
    repo_path = None

    # Locate the Gerador-Desc repository on the user's disk
    for root, dirs, files in os.walk(os.path.expanduser("~")):
        if '.git' in dirs and os.path.basename(root) == 'Gerador-Desc':
            repo_path = root
            break

    if not repo_path:
        print("Gerador-Desc repository not found on user's disk.")
        return

    # Load the config.json file
    with open(os.path.join(repo_path, 'sec', 'config.json'), 'r', encoding='utf-8') as f:
        config = json.load(f)

    # Connect to the MySQL server
    conn = mysql.connector.connect(
        host=config["dbHost"],
        port=config["dbPort"],
        user=config["dbUsername"],
        password=config["dbPassword"],
        database=config["dbName"]
    )
    cursor = conn.cursor()

    # Query the MySQL server for data
    cursor.execute("SELECT * FROM eAud.`De-Para`")
    rows = cursor.fetchall()

    # Create a new data object based on the SQL data
    data = []
    if rows is not None:
        for row in rows:
            item = {
                'Tipo de Demanda': row[1],
                'CodDemanda': row[0],
                'CodAtividade': row[2],
                'Atividade': row[3],
                'CodProduto': row[4],
                'Produto': row[5]
            }
            data.append(item)

    # Update the depara.json file
    with open(os.path.join(repo_path, 'depara.json'), 'w', encoding='utf-8') as f:
        json.dump(data, f)

    print("De-Para Do Gerador Foi Atualizado!")

update_depara_json()