# -*- coding: utf-8 -*-

import pandas as pd
import json
import os
from datetime import datetime, timedelta

def ler_quadro_ferias(ferias_dir):
    # Encontra o diretório do ano atual
    ano_atual = str(datetime.now().year)
    ano_dir = os.path.join(ferias_dir, ano_atual)

    # Encontra o arquivo do quadro de férias
    quadro_ferias = None
    for file in os.listdir(ano_dir):
        if file.startswith('Quadro de Férias Audin') and file.endswith('.xlsx'):
            quadro_ferias = os.path.join(ano_dir, file)
            break

    if not quadro_ferias:
        print(f'Arquivo do quadro de férias não encontrado em {ano_dir}')
        return None

    # Lê o arquivo Excel e armazena em um DataFrame
    try:
        df = pd.read_excel(quadro_ferias)
    except Exception as e:
        print(f'Erro ao abrir o arquivo {quadro_ferias}: {e}')
        return None

    print(df)

'''
    # Filtra o DataFrame para manter apenas as colunas relevantes
    df = df[['SERVIDOR/COLABORADOR', '1º PERÍODO INÍCIO', '1º PERÍODO DURAÇÃO', '2º PERÍODO INÍCIO', '2º PERÍODO DURAÇÃO', '3ª PERÍODO INÍCIO', '3ª PERÍODO DURAÇÃO']]

    # Converte as datas para o formato correto
    df['1º PERÍODO INÍCIO'] = pd.to_datetime(df['1º PERÍODO INÍCIO'], format='%d/%m/%Y')
    df['1º PERÍODO TERMINO'] = df['1º PERÍODO INÍCIO'] + pd.to_timedelta(df['1º PERÍODO DURAÇÃO'], unit='D')
    df['2º PERÍODO INÍCIO'] = pd.to_datetime(df['2º PERÍODO INÍCIO'], format='%d/%m/%Y')
    df['2º PERÍODO TERMINO'] = df['2º PERÍODO INÍCIO'] + pd.to_timedelta(df['2º PERÍODO DURAÇÃO'], unit='D')
    df['3ª PERÍODO INÍCIO'] = pd.to_datetime(df['3ª PERÍODO INÍCIO'], format='%d/%m/%Y')
    df['3ª PERÍODO TERMINO'] = df['3ª PERÍODO INÍCIO'] + pd.to_timedelta(df['3ª PERÍODO DURAÇÃO'], unit='D')

    # Agrupa as férias por servidor/colaborador
    ferias_dict = df.groupby('SERVIDOR/COLABORADOR')[['1º PERÍODO INÍCIO', '1º PERÍODO TERMINO', '2º PERÍODO INÍCIO', '2º PERIODOM TERMINO', '3ª PERIODOM INICIO', '3ª PERIODOM TERMINO']].apply(lambda x: x.to_dict(orient='records')).to_dict()

    # Salva as informações de férias em um arquivo JSON
    with open('ferias.json', 'w') as f:
        json.dump(ferias_dict, f, indent=4)
'''


ler_quadro_ferias('X:\\01 - ADMINISTRATIVO\\04 - Pessoal AUDIN\\FÉRIAS\\')