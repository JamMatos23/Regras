import re

textoteste = "<demanda>2</demanda><atividade>1</atividade><produto>1</produto><idEaud>4585486</idEaud><anoAcao>2022</anoAcao><idAcao>09</idAcao><idSprint>12</idSprint>"

def stripFunc(striptext, tagname):
    regex = r'<{0}>(.*?)<\/{0}>'.format(tagname)
    match = re.search(regex, striptext)

    if match:
        result = match.group(1)
        if (result == ""): result = "N/A"
        return result

demanda = stripFunc(textoteste, "demanda")
atividade = stripFunc(textoteste, "atividade")
produto = stripFunc(textoteste, "produto")
idEaud = stripFunc(textoteste, "idEaud")
anoAcao = stripFunc(textoteste, "anoAcao")
idAcao = stripFunc(textoteste, "idAcao")
sprint = stripFunc(textoteste, "idSprint")