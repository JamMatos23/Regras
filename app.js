const YYYY = document.getElementById('YYYY');
const AA = document.getElementById('AA');
const PP = document.getElementById('PP');
const AT = document.getElementById('AT');
const DDD = document.getElementById('DDD');
const SP = document.getElementById('SP');
const enviar = document.getElementById('gerar');
const apagar = document.getElementById('reset');
const Ret = document.getElementById('Ret');

var primeiraColuna = document.getElementById('DDD');
var segundaColuna = document.getElementById('AT');
var terceiraColuna = document.getElementById('PP')

primeiraColuna.addEventListener('change', function() {
   var selectedGroup = this.options[this.selectedIndex].value;

   for (var i = 0; i < segundaColuna.options.length; i++) {
      var option = segundaColuna.options[i];
      if (option.getAttribute('data-group') === selectedGroup) {
         option.style.display = 'block';
         for (var j = 0; j < terceiraColuna.options.length; j++) {
            var subOption = terceiraColuna.options[j];
            if (subOption.getAttribute('data-subgroup') === selectedGroup &&
                  subOption.getAttribute('data-group') === option.value) {
               subOption.style.display = 'block';
            } else {
               subOption.style.display = 'none';
            }
         }
      } else {
         option.style.display = 'none';
      }
} });


const possibilidades = [
   {
      text: '-- idAcao --',
      ano: '',
      value: ''
   },
   {
      text: 'Ação 01/2022 - Elaboração de testes montagem de provas do Enem',
      ano: 2022,
      value: '01'
   },
   {
      text: 'Ação 02/2022 - Gerir Banco Nacional de Itens',
      ano: 2022,
      value: '02'
   },
   {
      text: 'Ação 03/2022 - Gestão da Integridade Pública',
      ano: 2022,
      value: '03'
   },
   {
      text: 'Ação 03/2022 - Processo de Montagem de testes do Enem',
      ano: 2022,
      value: '03'
   },
   {
      text: 'Ação 07/2022 - Processo de Concessão e Pagamentos da GECC',
      ano: 2022,
      value: '07'
   },
   {
      text: 'Ação 08/2022 - Gestão Orçamentária',
      ano: 2022,
      value: '08'
   },
   {
      text: 'Ação 09/2022 - Licitações e Contratos',
      ano: 2022,
      value: '09'
   },
   {
      text: 'Ação 04/2023 - Consultoria no Processo de Gestão de Riscos',
      ano: 2023,
      value: '04'
   },
   {
      text: 'Ação 05/2023 - Processos de Gestão da Contratação de Serviços Especializados de Aplicação do Enem/Desenvolver e Monitorar a Logistica dos Exames e valiação',
      ano: 2023,
      value: '05'
   },
   {
      text: 'Ação 06/2023 - Auditoria do Processo de Gestão do Banco de Dados de Especialistas',
      ano: 2023,
      value: '06'
   },
   {
      text: 'Ação 07/2023 - Auditoria do Portifólio de Projetos e Processos',
      ano: 2023,
      value: '07'
   },
   {
      text: 'Acompanhamento do PAINT/RAINT',
      ano: 2023,
      value: '1'
   },
   {
      text: 'RAINT/2022',
      ano: 2023,
      value: '2'
   },
   {
      text: 'PAINT/2024',
      ano: 2023,
      value: '3'
   },
   {
      text: 'Acompanhamento/levantamento de auditorias CGU e TCU',
      ano: 2023,
      value: '4'
   },
   {
      text: 'Parecer sobre a prestação de contas anual do Inep',
      ano: 2023,
      value:'5'
   },
   {
      text: 'Supervisão',
      ano: 2023,
      value:'6'
   },
   {
      text: 'Monitoramento CGU/TCU',
      ano: 2023,
      value:'7'
   },
   {
      text: 'Monitoramento de recomendações',
      ano: 2023,
      value:'8'
   },
   {
      text: 'Gestão da Unidade',
      ano: 2023,
      value:'9'
   },
   {
      text: 'Gestão documental e controle de demandas externas.',
      ano: 2023,
      value:'10'
   },
]

YYYY.addEventListener('change', ()=> {
    let arr = []
    let str = ''
    
    possibilidades.forEach(element => {
        if(element.ano == YYYY.value || element.ano == '') arr.push(element)
    });

    arr.map(item => str += `<option value="${item.value}">${item.text}</option>`)

    AA.innerHTML = str
})

enviar.addEventListener("click", event => {
    event.preventDefault()

    const PAA = AA.value
    const PYYYY = YYYY.value
    const PPP = PP.value
    const PDDD = DDD.value
    const PAT = AT.value
    const PSP = SP.value

    Ret.value = ('<demanda>'+PDDD+'</demanda><atividade>'+PAT+'</atividade><produto>'+PPP+'</produto><anoAcao>'+PYYYY+'</anoAcao><idAcao>'+PAA+'</idAcao><idSprint>'+PSP+'</idSprint>');
}); 

apagar.addEventListener("click", event => {
    event.preventDefault()
    AA.value = ''
    YYYY.value = ''
    PP.value = ''
    DDD.value = ''
    AT.value = ''
    SP.value = ''
    Ret.value = ''
});

function copiarResultado() {
    if(Ret.value == "") return;

    Ret.select();
    navigator.clipboard.writeText(Ret.value); 
}