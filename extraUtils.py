import os
import re

def gap(relative_path):
    # Get the directory of the script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    # Join the script directory with the relative path
    absolute_path = os.path.join(script_dir, relative_path)
    return absolute_path

def personalizar_html(arquivo_html, valores):
    with open(arquivo_html, 'r') as f:
        html = f.read()
    for chave, valor in valores.items():
        html = html.replace('{' + chave + '}', str(valor))
    return html

def corrigir_codificacao(texto):
    # Replace common encoding errors with the correct characters
    texto = texto.replace('Ã¡', 'á')
    texto = texto.replace('Ã ', 'à')
    texto = texto.replace('Ã¢', 'â')
    texto = texto.replace('Ã£', 'ã')
    texto = texto.replace('Ã©', 'é')
    texto = texto.replace('Ãª', 'ê')
    texto = texto.replace('Ã­', 'í')
    texto = texto.replace('Ã³', 'ó')
    texto = texto.replace('Ã²', 'ò')
    texto = texto.replace('Ã´', 'ô')
    texto = texto.replace('Ãµ', 'õ')
    texto = texto.replace('Ãº', 'ú')
    texto = texto.replace('Ã¼', 'ü')
    texto = texto.replace('Ã§', 'ç')
    # Add more replacements as needed
    return texto

def stripFunc(striptext, tagname):
    regex = r'<{0}>(.*?)<\/{0}>'.format(tagname)
    match = re.search(regex, striptext)

    if match:
        result = match.group(1)
        if (result == ""): result = ''
        return result

def stripTrash(striptext):
    numbers = ''.join(filter(lambda i: i.isdigit(), striptext))
    return numbers