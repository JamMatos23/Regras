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
      } else {
         option.style.display = 'none';
      }
   }
});


function atualizarDPAT() {
   var selectDDD = document.getElementById("DDD");
   var selectAT = document.getElementById("AT");
   var originalOptions = selectAT.innerHTML;
   //Planejamento Anual
   if (selectDDD.value == 1) { 
      selectAT.innerHTML = originalOptions;
      selectAT.options[0].text = "-- atividade --";
      selectAT.options[0].value = "";
      selectAT.options[1].text = "Elaboração/Atualização do PAINT";
      selectAT.options[1].value = "1";
      selectAT.options[2].text = "Elaboração/Atualização do RAINT";
      selectAT.options[2].value = "2";
      selectAT.options[3].text = "Mapeamento do Universo de Auditoria";
      selectAT.options[3].value = "3";
      for (var i = 4; i < selectAT.options.length; i++) {
         selectAT.options[i].style.display = "none";
      }
   } //Avaliação
    else if (selectDDD.value == 2) {
      selectAT.innerHTML = originalOptions;
      selectAT.options[0].text = "-- atividade --";
      selectAT.options[0].value = "";
      selectAT.options[1].text = "Planejamento";
      selectAT.options[1].value = "1";
      selectAT.options[2].text = "Execução";
      selectAT.options[2].value = "2";
      selectAT.options[3].text = "Achados de Auditoria";
      selectAT.options[3].value = "3";
      selectAT.options[4].text = "Relatoria";
      selectAT.options[4].value = "4";
      for (var i = 5; i < selectAT.options.length; i++) {
         selectAT.options[i].style.display = "none";
      }
      
   } //Consultoria
    else if (selectDDD.value == 3) {
      selectAT.options[0].text = "-- atividade --";
      selectAT.options[0].value = "";
      selectAT.options[1].text = "Planejamento";
      selectAT.options[1].value = "1";
      selectAT.options[2].text = "Execução";
      selectAT.options[2].value = "2";
      selectAT.options[3].text = "Achados de Auditoria";
      selectAT.options[3].value = "3";
      selectAT.options[4].text = "Relatoria";
      selectAT.options[4].value = "4";
      for (var i = 5; i < selectAT.options.length; i++) {
         selectAT.options[i].style.display = "none";
      }
   } //Apuração
   else if (selectDDD.value == 4) {
      selectAT.options[0].text = "-- atividade --";
      selectAT.options[0].value = "";
      selectAT.options[1].text = "Planejamento";
      selectAT.options[1].value = "1";
      selectAT.options[2].text = "Execução";
      selectAT.options[2].value = "2";
      selectAT.options[3].text = "Achados de Auditoria";
      selectAT.options[3].value = "3";
      selectAT.options[4].text = "Relatoria";
      selectAT.options[4].value = "4";
      for (var i = 5; i < selectAT.options.length; i++) {
         selectAT.options[i].style.display = "none";
      }
      
   } //Monitoramento
   else if (selectDDD.value == 5) {
      selectAT.options[0].text = "-- atividade --";
      selectAT.options[0].value = "";
      selectAT.options[1].text = "Monitoramento das Recomendações";
      selectAT.options[1].value = "1";
      selectAT.options[2].text = "Contabilização de benefícios";
      selectAT.options[2].value = "2";
      for (var i = 3; i < selectAT.options.length; i++) {
         selectAT.options[i].style.display = "none";
      }
      
   } //Demandas Externas
   else if (selectDDD.value == 6) {
      selectAT.options[0].text = "-- atividade --";
      selectAT.options[0].value = "";
      selectAT.options[1].text = "Contabilização de benefícios";
      selectAT.options[1].value = "1";
      selectAT.options[2].text = "Acompanhamento de Demandas CGU";
      selectAT.options[2].value = "2";
      selectAT.options[3].text = "Análise de admissibilidade de Denúncias";
      selectAT.options[3].value = "3";
      selectAT.options[4].text = "Suporte a Ação de Auditoria do TCU";
      selectAT.options[4].value = "4";
      selectAT.options[5].text = "Suporte a ação de Auditoria do CGU";
      selectAT.options[5].value = "5";
      for (var i = 6; i < selectAT.options.length; i++) {
         selectAT.options[i].style.display = "none";
      }
   } //PGMQ
   else if (selectDDD.value == 7) {
      selectAT.options[0].text = "-- atividade --";
      selectAT.options[0].value = "";
      selectAT.options[1].text = "Auto-Avaliação do IA-CM";
      selectAT.options[1].value = "1";
      selectAT.options[2].text = "Elaboração de Plano de Ação";
      selectAT.options[2].value = "2";
      selectAT.options[3].text = "Relatório de Avaliação IA-CM";
      selectAT.options[3].value = "3";
      for (var i = 4; i < selectAT.options.length; i++) {
         selectAT.options[i].style.display = "none";
      }
      
   } //Demandas Administrativas
   else if (selectDDD.value == 8) {
      selectAT.options[0].text = "-- atividade --";
      selectAT.options[0].value = "";
      selectAT.options[1].text = "Produção/Atualização de documentos";
      selectAT.options[1].value = "1";
      selectAT.options[2].text = "Gestão do SEI";
      selectAT.options[2].value = "2";
      for (var i = 5; i < selectAT.options.length; i++) {
         selectAT.options[i].style.display = "none";
      }
      
   } //Demandas de TIC
   else if (selectDDD.value == 9) {
      selectAT.options[0].text = "-- atividade --";
      selectAT.options[0].value = "";
      selectAT.options[1].text = "Manipulação de Base de Dados";
      selectAT.options[1].value = "1";
      selectAT.options[2].text = "Desenvolvimento/Manutenção de Aplicativo";
      selectAT.options[2].value = "2";
      selectAT.options[3].text = "Desenvolvimento/Manutenção de Painel Gerencial";
      selectAT.options[3].value = "3";
      selectAT.options[4].text = "Gestão do e-AUD";
      selectAT.options[4].value = "4";
      selectAT.options[5].text = "Gestão do SharePoint";
      selectAT.options[5].value = "5";
      selectAT.options[6].text = "Outros";
      selectAT.options[6].value = "6";
      for (var i = 7; i < selectAT.options.length; i++) {
         selectAT.options[i].style.display = "none";
      }
      
   } //Capacitação
   else if (selectDDD.value == 10) {
      selectAT.options[0].text = "-- atividade --";
      selectAT.options[0].value = "";
      selectAT.options[1].text = "Participação em cursos";
      selectAT.options[1].value = "1";
      selectAT.options[2].text = "Estudo Individual";
      selectAT.options[2].value = "2";
      for (var i = 3; i < selectAT.options.length; i++) {
         selectAT.options[i].style.display = "none";
      }
      
   } //Ausência
   else if (selectDDD.value == 11) {
      selectAT.innerHTML = originalOptions;
      selectAT.options[0].text = "-- atividade --";
      selectAT.options[0].value = "";
      selectAT.options[1].text = "Ausência";
      selectAT.options[1].value = "1";
      for (var i = 2; i < selectAT.options.length; i++) {
         selectAT.options[i].style.display = "none";
      }
   } //Participação em reuniões/GT
   else if (selectDDD.value == 12) {
      selectAT.options[0].text = "-- atividade --";
      selectAT.options[0].value = "";
      selectAT.options[1].text = "";
      selectAT.options[1].value = "";
      for (var i = 2; i < selectAT.options.length; i++) {
         selectAT.options[i].style.display = "none";
      }
      
   } //Outros
   else if (selectDDD.value == 13) {
      selectAT.options[0].text = "-- atividade --";
      selectAT.options[0].value = "";
      selectAT.options[1].text = "";
      selectAT.options[1].value = "";
      for (var i = 2; i < selectAT.options.length; i++) {
         selectAT.options[i].style.display = "none";
      }
      
   }
   else {
      for (var i = 0; i < selectAT.options.length; i++) {
        selectAT.options[i].style.display = "";
      }
    }
 };

function atualizarATPPP() {
   var selectAT = document.getElementById("AT");
   var selectATText = selectAT.selectedOptions[0].text;
   var selectPP = document.getElementById("PP");
   var numOptions = selectPP.options;
   //Elaboração/Atualização do PAINT
   if (selectATText == "Elaboração/Atualização do PAINT") {
      selectPP.options[0].text = "-- id do produto --";
      selectPP.options[0].value = "";
      selectPP.options[1].text = "PAINT Preliminar";
      selectPP.options[1].value = "1";
      selectPP.options[2].text = "PAINT Definitivo";
      selectPP.options[2].value = "2";
   }
   //Elaboração/Atualização do RAINT 
   else if (selectATText == "Elaboração/Atualização do RAINT") {
      selectPP.options[0].text = "-- id do produto --";
      selectPP.options[0].value = "";
      selectPP.options[1].text = "RAINT Preliminar";
      selectPP.options[1].value = "1";
      selectPP.options[2].text = "RAINT Definitivo";
      selectPP.options[2].value = "2";
   }
   //Mapeamento do Universo de Auditoria
   else if (selectATText == "Mapeamento do Universo de Auditoria") {
      var numOptions = 2;
      selectPP.options[0].text = "-- id do produto --";
      selectPP.options[0].value = "";
      selectPP.options[1].text = "Universo de auditoria";
      selectPP.options[1].value = "1";
    }
    else if (selectATText == "Planejamento") {
      selectPP.options[0].text = "-- id do produto --";
      selectPP.options[0].value = "";
      selectPP.options[1].text = "Análise Preliminar";
      selectPP.options[1].value = "1";
      selectPP.options[2].text = "Matriz de Riscos";
      selectPP.options[2].value = "2";
      selectPP.options[3].text = "Matriz de Planejamento";
      selectPP.options[3].value = "3";
    }
    else if (selectATText == "Execução") {
      selectPP.options[0].text = "-- id do produto --";
      selectPP.options[0].value = "";
      selectPP.options[1].text = "Escopo da Auditoria";
      selectPP.options[1].value = "1";
      selectPP.options[2].text = "Papéis de Trabalho";
      selectPP.options[2].value = "2";
      selectPP.options[3].text = "Matriz de Achados";selectPP.options[3].value = "3";
      
    }
    else if (selectATText == "Achados de Auditoria") {
      selectPP.options[0].text = "-- id do produto --";
      selectPP.options[0].value = "";
      selectPP.options[1].text = "Recomendações cadastradas";
      selectPP.options[1].value = "1";
      
    }
    else if (selectATText == "Relatoria") {
      selectPP.options[0].text = "-- id do produto --";
      selectPP.options[0].value = "";
      selectPP.options[1].text = "Relatório Preliminar";
      selectPP.options[1].value = "1";
      selectPP.options[2].text = "Relatório Final";
      selectPP.options[2].value = "2";
      
    }
    else if (selectATText == "Monitoramento das Recomendações") {
      selectPP.options[0].text = "-- id do produto --";
      selectPP.options[0].value = "";
      selectPP.options[1].text = "Recomendação monitorada";
      selectPP.options[1].value = "1";
      
    }
    else if (selectATText == "Contabilização de benefícios") {
      selectPP.options[0].text = "-- id do produto --";
      selectPP.options[0].value = "";
      selectPP.options[1].text = "Benefício contabilizado";
      selectPP.options[1].value = "2";
      
    }
    else if (selectATText == "Acompanhamento de Diligências TCU") {
      selectPP.options[0].text = "-- id do produto --";
      selectPP.options[0].value = "";
      selectPP.options[1].text = "";
      selectPP.options[1].value = "";
      
    }
    else if (selectATText == "Outros") {
      selectPP.options[0].text = "-- id do produto --";
      selectPP.options[0].value = "";
      selectPP.options[1].text = "";
      selectPP.options[1].value = "";
      
    }
    else if (selectATText == "Acompanhamento de Demandas CGU") {
      selectPP.options[0].text = "-- id do produto --";
      selectPP.options[0].value = "";
      selectPP.options[1].text = "";
      selectPP.options[1].value = "";
      
    }
    else if (selectATText == "Análise de admissibilidade de Denúncias") {
      selectPP.options[0].text = "-- id do produto --";
      selectPP.options[0].value = "";
      selectPP.options[1].text = "";
      selectPP.options[1].value = "";
      
    }
    else if (selectATText == "Suporte a Ação de Auditoria do TCU") {
      selectPP.options[0].text = "-- id do produto --";
      selectPP.options[0].value = "";
      selectPP.options[1].text = "";
      selectPP.options[1].value = "";
      
    }
    else if (selectATText == "Suporte a ação de Auditoria do CGU") {
      selectPP.options[0].text = "-- id do produto --";
      selectPP.options[0].value = "";
      selectPP.options[1].text = "";
      selectPP.options[1].value = "";
      
    }
    else if (selectATText == "Auto-Avaliação do IA-CM") {
      selectPP.options[0].text = "-- id do produto --";
      selectPP.options[0].value = "";
      selectPP.options[1].text = "Construção da matriz de avaliação";
      selectPP.options[1].value = "1";
      selectPP.options[2].text = "Avaliação inserida no e-aud";
      selectPP.options[2].value = "2";
      
    }
    else if (selectATText == "Elaboração de Plano de Ação") {
      selectPP.options[0].text = "-- id do produto --";
      selectPP.options[0].value = "";
      selectPP.options[1].text = "Plano de ação aprovado";
      selectPP.options[1].value = "1";
      
    }
    else if (selectATText == "Relatório de Avaliação IA-CM") {
      selectPP.options[0].text = "-- id do produto --";
      selectPP.options[0].value = "";
      selectPP.options[1].text = "Relatório aprovado";
      selectPP.options[1].value = "1";
      
    }
    else if (selectATText == "Produção/Atualização de documentos") {
      selectPP.options[0].text = "-- id do produto --";
      selectPP.options[0].value = "";
      selectPP.options[1].text = "Normativo";
      selectPP.options[1].value = "1";
      selectPP.options[2].text = "Parecer";
      selectPP.options[2].value = "2";
      selectPP.options[3].text = "Manual Operacional";
      selectPP.options[3].value = "3";
      selectPP.options[4].text = "POP";
      selectPP.options[4].value = "4";
      
    }
    else if (selectATText == "Gestão do SEI") {
      selectPP.options[0].text = "-- id do produto --";
      selectPP.options[0].value = "";
      selectPP.options[1].text = "";
      selectPP.options[1].value = "";
      
    }
    else if (selectATText == "Desenvolvimento/Manutenção de Aplicativo") {
      selectPP.options[0].text = "-- id do produto --";
      selectPP.options[0].value = "";
      selectPP.options[1].text = "Aplicativo";
      selectPP.options[1].value = "1";
      
    }
    else if (selectATText == "Manipulação de Base de Dados") {
      selectPP.options[0].text = "-- id do produto --";
      selectPP.options[0].value = "";
      selectPP.options[1].text = "Consulta SQL";
      selectPP.options[1].value = "1";
      
    }
    else if (selectATText == "Desenvolvimento/Manutenção de Painel Gerencial") {
      selectPP.options[0].text = "-- id do produto --";
      selectPP.options[0].value = "";
      selectPP.options[1].text = "Painel Gerencial";
      selectPP.options[1].value = "1";
      selectPP.options[2].text = "";
      selectPP.options[2].value = "";
      
    }
    else if (selectATText == "Gestão do SEI") {
      selectPP.options[0].text = "-- id do produto --";
      selectPP.options[0].value = "";
      selectPP.options[1].text = "";
      selectPP.options[1].value = "";
      
    }
    else if (selectATText == "Gestão do SharePoint") {
      selectPP.options[0].text = "-- id do produto --";
      selectPP.options[0].value = "";
      selectPP.options[1].text = "";
      selectPP.options[1].value = "";
      
    }
    else if (selectATText == "Participação em cursos") {
      selectPP.options[0].text = "-- id do produto --";
      selectPP.options[0].value = "";
      selectPP.options[1].text = "";
      selectPP.options[1].value = "";
      
    }
    else if (selectATText == "Estudo individual") {
      selectPP.options[0].text = "-- id do produto --";
      selectPP.options[0].value = "";
      selectPP.options[1].text = "";
      selectPP.options[1].value = "";
      
    }
    else if (selectATText == "Ausência") {
      selectPP.options[0].text = "-- id do produto --";
      selectPP.options[0].value = "";
      selectPP.options[1].text = "Atestado Médico";
      selectPP.options[1].value = "1";
      selectPP.options[2].text = "Férias";
      selectPP.options[2].value = "2";
      
   }
   else {
      for (var i = 0; i < selectAT.options.length; i++) {
        selectAT.options[i].style.display = "";
      }
   }
   for (var i = numOptions; i < selectPP.options.length; i++) {
      selectPP.options[i].style.display = "none";
   }
};
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