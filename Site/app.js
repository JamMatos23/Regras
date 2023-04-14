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
    for (var i = 0; i < 4; i++) {
      selectAT.options[i].style.display = "block";
     }     

   } //Avaliação/Consultoria/Apuração

   else if (selectDDD.value == 2 || selectDDD.value == 3 || selectDDD.value == 4) {
     selectAT.innerHTML = originalOptions;
     selectAT.options[0].text = "-- atividade --";
     selectAT.options[0].value = "";
     selectAT.options[1].text = "Planejamento";
     selectAT.options[1].value = "1";
     selectAT.options[2].text = "Execução";
     selectAT.options[2].value = "2";
     selectAT.options[3].text = "Relatoria";
     selectAT.options[3].value = "3";
     selectAT.options[4].text = "Achados de Auditoria";
     selectAT.options[4].value = "4";

    for (var i = 5; i < selectAT.options.length; i++) {
      selectAT.options[i].style.display = "none";
     }
    for (var i = 0; i < 5; i++) {
      selectAT.options[i].style.display = "block";
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
     for (var i = 0; i < 3; i++) {
      selectAT.options[i].style.display = "block";
     }     

   } //Demandas Externas

   else if (selectDDD.value == 6) {
    selectAT.options[0].text = "-- atividade --";
    selectAT.options[0].value = "";
    selectAT.options[1].text = "Acompanhamento de Diligências TCU";
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
     for (var i = 0; i < 6; i++) {
      selectAT.options[i].style.display = "block";
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
     for (var i = 0; i < 4; i++) {
      selectAT.options[i].style.display = "block";
     }     

   } //Demandas Administrativas

   else if (selectDDD.value == 8) {
     selectAT.options[0].text = "-- atividade --";
     selectAT.options[0].value = "";
     selectAT.options[1].text = "Gestão do SEI";
     selectAT.options[1].value = "1";
     selectAT.options[2].text = "Produção/Atualização de documentos";
     selectAT.options[2].value = "2";

     for (var i = 3; i < selectAT.options.length; i++) {
      selectAT.options[i].style.display = "none";
     }
     for (var i = 0; i < 3; i++) {
      selectAT.options[i].style.display = "block";
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
     selectAT.options[4].text = "Gestão/Suporte do e-AUD";
     selectAT.options[4].value = "4";
     selectAT.options[5].text = "Gestão do SharePoint";
     selectAT.options[5].value = "5";
     selectAT.options[6].text = "Outros";
     selectAT.options[6].value = "6";

     for (var i = 7; i < selectAT.options.length; i++) {
      selectAT.options[i].style.display = "none";
     }
     for (var i = 0; i < 7; i++) {
      selectAT.options[i].style.display = "block";
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
     for (var i = 0; i < 3; i++) {
      selectAT.options[i].style.display = "block";
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
     for (var i = 0; i < 2; i++) {
      selectAT.options[i].style.display = "block";
     }     
   } //Participação em reuniões/GT/Outros

   else if (selectDDD.value == 12 || selectDDD.value == 13) {
     selectAT.options[0].text = "-- atividade --";
     selectAT.options[0].value = "";

     for (var i = 0; i < selectAT.options.length; i++) {
      selectAT.options[i].style.display = "none";
     } 

   }

   else {

     for (var i = 0; i < selectAT.options.length; i++) {
      selectAT.options[i].style.display = "";
     }

   }
});

segundaColuna.addEventListener('change', function() {
   var selectAT = document.getElementById("AT");
   var selectedOption = selectAT.options[selectAT.selectedIndex];
   var selectATText = selectedOption.text;
   var selectPP = document.getElementById("PP");
   //Elaboração/Atualização do PAINT
   if (selectATText == "Elaboração/Atualização do PAINT") {
     selectPP.options[0].text = "-- id do produto --";
     selectPP.options[0].value = "";
     selectPP.options[1].text = "PAINT Preliminar";
     selectPP.options[1].value = "1";
     selectPP.options[2].text = "PAINT Definitivo";
     selectPP.options[2].value = "2";
     for (var i = 3; i < selectPP.options.length; i++) {
      selectPP.options[i].style.display = "none";
     }
     for (var i = 0; i < 3; i++) {
      selectPP.options[i].style.display = "block";
     }
   }
   //Elaboração/Atualização do RAINT 
   else if (selectATText == "Elaboração/Atualização do RAINT") {
     selectPP.options[0].text = "-- id do produto --";
     selectPP.options[0].value = "";
     selectPP.options[1].text = "RAINT Preliminar";
     selectPP.options[1].value = "1";
     selectPP.options[2].text = "RAINT Definitivo";
     selectPP.options[2].value = "2";
     for (var i = 3; i < selectPP.options.length; i++) {
      selectPP.options[i].style.display = "none";
     }
     for (var i = 0; i < 3; i++) {
      selectPP.options[i].style.display = "block";
     }
   }
   //Mapeamento do Universo de Auditoria
   else if (selectATText == "Mapeamento do Universo de Auditoria") {
     selectPP.options[0].text = "-- id do produto --";
     selectPP.options[0].value = "";
     selectPP.options[1].text = "Universo de auditoria";
     selectPP.options[1].value = "1";
     var i = 2;
     for (var i = 2; i < selectPP.options.length; i++) {
      selectPP.options[i].style.display = "none";
     }
    for (var i = 0; i < 2; i++) {
      selectPP.options[i].style.display = "block";
     }
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
     for (var i = 4; i < selectPP.options.length; i++) {
      selectPP.options[i].style.display = "none";
     }
     for (var i = 0; i < 4; i++) {
      selectPP.options[i].style.display = "block";
     }   
    }
   else if (selectATText == "Execução") {
     selectPP.options[0].text = "-- id do produto --";
     selectPP.options[0].value = "";
     selectPP.options[1].text = "Escopo da Auditoria";
     selectPP.options[1].value = "1";
     selectPP.options[2].text = "Papéis de Trabalho";
     selectPP.options[2].value = "2";
     selectPP.options[3].text = "Matriz de Achados";
     selectPP.options[3].value = "3";
     for (var i = 4; i < selectPP.options.length; i++) {
      selectPP.options[i].style.display = "none";
     }
     for (var i = 0; i < 4; i++) {
      selectPP.options[i].style.display = "block";
     }     
   }
   else if (selectATText == "Achados de Auditoria") {
     selectPP.options[0].text = "-- id do produto --";
     selectPP.options[0].value = "";
     selectPP.options[1].text = "Recomendações cadastradas";
     selectPP.options[1].value = "1";
     for (var i = 2; i < selectPP.options.length; i++) {
      selectPP.options[i].style.display = "none";
     }
     for (var i = 0; i < 2; i++) {
      selectPP.options[i].style.display = "block";
     }     
   }
   else if (selectATText == "Relatoria") {
     selectPP.options[0].text = "-- id do produto --";
     selectPP.options[0].value = "";
     selectPP.options[1].text = "Relatório Preliminar";
     selectPP.options[1].value = "1";
     selectPP.options[2].text = "Relatório Final";
     selectPP.options[2].value = "2";
     for (var i = 3; i < selectPP.options.length; i++) {
      selectPP.options[i].style.display = "none";
     }
     for (var i = 0; i < 3; i++) {
      selectPP.options[i].style.display = "block";
     }
   }
   else if (selectATText == "Monitoramento das Recomendações") {
     selectPP.options[0].text = "-- id do produto --";
     selectPP.options[0].value = "";
     selectPP.options[1].text = "Recomendação monitorada";
     selectPP.options[1].value = "1";
     for (var i = 2; i < selectPP.options.length; i++) {
      selectPP.options[i].style.display = "none";
     }
     for (var i = 0; i < 2; i++) {
      selectPP.options[i].style.display = "block";
     }     
   }
   else if (selectATText == "Contabilização de benefícios") {
     selectPP.options[0].text = "-- id do produto --";
     selectPP.options[0].value = "";
     selectPP.options[1].text = "Benefício contabilizado";
     selectPP.options[1].value = "2";
     for (var i = 2; i < selectPP.options.length; i++) {
      selectPP.options[i].style.display = "none";
     }
     for (var i = 0; i < 2; i++) {
      selectPP.options[i].style.display = "block";
     }     
   }
   else if (selectATText == "Acompanhamento de Diligências TCU") {
     selectPP.options[0].text = "-- id do produto --";
     selectPP.options[0].value = "";
     selectPP.options[1].text = "";
     selectPP.options[1].value = "";
     for (var i = 2; i < selectPP.options.length; i++) {
      selectPP.options[i].style.display = "none";
     }
     for (var i = 0; i < 2; i++) {
      selectPP.options[i].style.display = "block";
     }     
   }
   else if (selectATText == "Outros") {
     selectPP.options[0].text = "-- id do produto --";
     selectPP.options[0].value = "";
     selectPP.options[1].text = "";
     selectPP.options[1].value = "";
     for (var i = 2; i < selectPP.options.length; i++) {
      selectPP.options[i].style.display = "none";
     }
     for (var i = 0; i < 2; i++) {
      selectPP.options[i].style.display = "block";
     }     
   }
   else if (selectATText == "Acompanhamento de Demandas CGU") {
     selectPP.options[0].text = "-- id do produto --";
     selectPP.options[0].value = "";
     selectPP.options[1].text = "";
     selectPP.options[1].value = "";
     for (var i = 2; i < selectPP.options.length; i++) {
      selectPP.options[i].style.display = "none";
     }
     for (var i = 0; i < 2; i++) {
      selectPP.options[i].style.display = "block";
     }     
   }
   else if (selectATText == "Análise de admissibilidade de Denúncias") {
     selectPP.options[0].text = "-- id do produto --";
     selectPP.options[0].value = "";
     selectPP.options[1].text = "";
     selectPP.options[1].value = "";
     for (var i = 2; i < selectPP.options.length; i++) {
      selectPP.options[i].style.display = "none";
     }
     for (var i = 0; i < 2; i++) {
      selectPP.options[i].style.display = "block";
     }     
   }
   else if (selectATText == "Suporte a Ação de Auditoria do TCU") {
     selectPP.options[0].text = "-- id do produto --";
     selectPP.options[0].value = "";
     selectPP.options[1].text = "";
     selectPP.options[1].value = "";
     for (var i = 2; i < selectPP.options.length; i++) {
      selectPP.options[i].style.display = "none";
     }
     for (var i = 0; i < 2; i++) {
      selectPP.options[i].style.display = "block";
     }     
   }
   else if (selectATText == "Suporte a ação de Auditoria do CGU") {
     selectPP.options[0].text = "-- id do produto --";
     selectPP.options[0].value = "";
     selectPP.options[1].text = "";
     selectPP.options[1].value = "";
     for (var i = 2; i < selectPP.options.length; i++) {
      selectPP.options[i].style.display = "none";
     }
     for (var i = 0; i < 2; i++) {
      selectPP.options[i].style.display = "block";
     }     
   }
   else if (selectATText == "Auto-Avaliação do IA-CM") {
     selectPP.options[0].text = "-- id do produto --";
     selectPP.options[0].value = "";
     selectPP.options[1].text = "Matriz de avaliação";
     selectPP.options[1].value = "1";
     selectPP.options[2].text = "Avaliação IA-CM";
     selectPP.options[2].value = "2";
     for (var i = 3; i < selectPP.options.length; i++) {
      selectPP.options[i].style.display = "none";
     }
     for (var i = 0; i < 3; i++) {
      selectPP.options[i].style.display = "block";
     }     
   }
   else if (selectATText == "Elaboração de Plano de Ação") {
     selectPP.options[0].text = "-- id do produto --";
     selectPP.options[0].value = "";
     selectPP.options[1].text = "Plano de ação";
     selectPP.options[1].value = "1";
     for (var i = 2; i < selectPP.options.length; i++) {
      selectPP.options[i].style.display = "none";
     }
     for (var i = 0; i < 2; i++) {
      selectPP.options[i].style.display = "block";
     }     
   }
   else if (selectATText == "Elaboração de Relatório de Avaliação IA-CM") {
     selectPP.options[0].text = "-- id do produto --";
     selectPP.options[0].value = "";
     selectPP.options[1].text = "Relatório de Avaliação IA-CM";
     selectPP.options[1].value = "1";
     for (var i = 2; i < selectPP.options.length; i++) {
      selectPP.options[i].style.display = "none";
     }
     for (var i = 0; i < 2; i++) {
      selectPP.options[i].style.display = "block";
     }     
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
     for (var i = 5; i < selectPP.options.length; i++) {
      selectPP.options[i].style.display = "none";
     }
     for (var i = 0; i < 5; i++) {
      selectPP.options[i].style.display = "block";
     }     
   }
   else if (selectATText == "Gestão do SEI") {
     selectPP.options[0].text = "-- id do produto --";
     selectPP.options[0].value = "";
     selectPP.options[1].text = "";
     selectPP.options[1].value = "";
     for (var i = 2; i < selectPP.options.length; i++) {
      selectPP.options[i].style.display = "none";
     }
     for (var i = 0; i < 2; i++) {
      selectPP.options[i].style.display = "block";
     }     
   }
   else if (selectATText == "Desenvolvimento/Manutenção de Aplicativo") {
     selectPP.options[0].text = "-- id do produto --";
     selectPP.options[0].value = "";
     selectPP.options[1].text = "Aplicativo";
     selectPP.options[1].value = "1";
     for (var i = 2; i < selectPP.options.length; i++) {
      selectPP.options[i].style.display = "none";
     }
     for (var i = 0; i < 2; i++) {
      selectPP.options[i].style.display = "block";
     }     
   }
   else if (selectATText == "Manipulação de Base de Dados") {
     selectPP.options[0].text = "-- id do produto --";
     selectPP.options[0].value = "";
     selectPP.options[1].text = "Consulta SQL";
     selectPP.options[1].value = "1";
     for (var i = 2; i < selectPP.options.length; i++) {
      selectPP.options[i].style.display = "none";
     }
     for (var i = 0; i < 2; i++) {
      selectPP.options[i].style.display = "block";
     }     
   }
   else if (selectATText == "Desenvolvimento/Manutenção de Painel Gerencial") {
     selectPP.options[0].text = "-- id do produto --";
     selectPP.options[0].value = "";
     selectPP.options[1].text = "Painel Gerencial";
     selectPP.options[1].value = "1";
     for (var i = 2; i < selectPP.options.length; i++) {
      selectPP.options[i].style.display = "none";
     }
     for (var i = 0; i < 2; i++) {
      selectPP.options[i].style.display = "block";
     }     
   }
   else if (selectATText == "Gestão do SEI") {
     selectPP.options[0].text = "-- id do produto --";
     selectPP.options[0].value = "";
     selectPP.options[1].text = "";
     selectPP.options[1].value = "";
     for (var i = 2; i < selectPP.options.length; i++) {
      selectPP.options[i].style.display = "none";
     }
     for (var i = 0; i < 2; i++) {
      selectPP.options[i].style.display = "block";
     }     
   }
   else if (selectATText == "Gestão do SharePoint") {
     selectPP.options[0].text = "-- id do produto --";
     selectPP.options[0].value = "";
     selectPP.options[1].text = "";
     selectPP.options[1].value = "";
     for (var i = 2; i < selectPP.options.length; i++) {
      selectPP.options[i].style.display = "none";
     }
     for (var i = 0; i < 2; i++) {
      selectPP.options[i].style.display = "block";
     }     
   }
   else if (selectATText == "Participação em cursos") {
     selectPP.options[0].text = "-- id do produto --";
     selectPP.options[0].value = "";
     selectPP.options[1].text = "";
     selectPP.options[1].value = "";
     for (var i = 2; i < selectPP.options.length; i++) {
      selectPP.options[i].style.display = "none";
     }
     for (var i = 0; i < 2; i++) {
      selectPP.options[i].style.display = "block";
     }     
   }
   else if (selectATText == "Estudo individual") {
     selectPP.options[0].text = "-- id do produto --";
     selectPP.options[0].value = "";
     selectPP.options[1].text = "";
     selectPP.options[1].value = "";
     for (var i = 2; i < selectPP.options.length; i++) {
      selectPP.options[i].style.display = "none";
     }
     for (var i = 0; i < 2; i++) {
      selectPP.options[i].style.display = "block";
     }     
   }
   else if (selectATText == "Ausência") {
     selectPP.options[0].text = "-- id do produto --";
     selectPP.options[0].value = "";
     selectPP.options[1].text = "Atestado Médico";
     selectPP.options[1].value = "1";
     selectPP.options[2].text = "Férias";
     selectPP.options[2].value = "2";
     for (var i = 3; i < selectPP.options.length; i++) {
      selectPP.options[i].style.display = "none";
     }
     for (var i = 0; i < 3; i++) {
      selectPP.options[i].style.display = "block";
     }     
   }
   else if (selectATText == "-- atividade --") {
     for (var i = 0; i < selectPP.options.length; i++) {
      selectPP.options[i].style.display = "block";
     }
   }
});

primeiraColuna.addEventListener('change', function() {
   var selectDDD = document.getElementById("DDD");
   var selectedOption = selectDDD.options[selectDDD.selectedIndex];
   var selectDDDText = selectedOption.text;
   var selectAA = document.getElementById("AA");
   if (selectDDDText == "Apuração" || selectDDDText == "Avaliação" || selectDDDText == "Consultoria" || selectDDDText == "Monitoramento") {
     selectAA.options[0].text = "-- id da ação --";
     selectAA.options[0].value = "";
     selectAA.options[1].text = "Ação 01/2022 - Elaboração de testes montagem de provas do Enem";
     selectAA.options[1].value = "01";
     selectAA.options[2].text = "Ação 02/2022 - Gerir Banco Nacional de Itens";
     selectAA.options[2].value = "02";
     selectAA.options[3].text = "Ação 03/2022 - Gestão da Integridade Pública";
     selectAA.options[3].value = "03";
     selectAA.options[4].text = "Ação 03/2022 - Processo de Montagem de testes do Enem";
     selectAA.options[4].value = "03";
     selectAA.options[5].text = "Ação 07/2022 - Processo de Concessão e Pagamentos da GECC";
     selectAA.options[5].value = "07";
     selectAA.options[6].text = "Ação 08/2022 - Gestão Orçamentária";
     selectAA.options[6].value = "08";    
     selectAA.options[7].text = "Ação 09/2022 - Licitações e Contratos";
     selectAA.options[7].value = "09";    
     selectAA.options[8].text = "Ação 04/2023 - Consultoria no Processo de Gestão de Riscos";
     selectAA.options[8].value = "04";    
     selectAA.options[9].text = "Ação 05/2023 - Processos de Gestão da Contratação de Serviços Especializados de Aplicação do Enem/Desenvolver e Monitorar a Logistica dos Exames e valiação";
     selectAA.options[9].value = "05";
     selectAA.options[10].text = "Ação 06/2023 - Auditoria do Processo de Gestão do Banco de Dados de Especialistas";
     selectAA.options[10].value = "06";     
     selectAA.options[11].text = "Ação 07/2023 - Auditoria do Portifólio de Projetos e Processos";
     selectAA.options[11].value = "07";
     selectAA.options[12].text = "Acompanhamento do PAINT";
     selectAA.options[12].value = "1"; 
     selectAA.options[13].text = "RAINT/2022";
     selectAA.options[13].value = "2"; 
     selectAA.options[14].text = "PAINT/2024";
     selectAA.options[14].value = "3"; 
     selectAA.options[15].text = "Acompanhamento/levantamento de auditorias CGU e TCU";
     selectAA.options[15].value = "4"; 
     selectAA.options[16].text = "Parecer sobre a prestação de contas anual do Inep";
     selectAA.options[16].value = "5"; 
     selectAA.options[17].text = "Supervisão";
     selectAA.options[17].value = "6"; 
     selectAA.options[18].text = "Monitoramento CGU/TCU";
     selectAA.options[18].value = "7"; 
     selectAA.options[19].text = "Monitoramento de recomendações";
     selectAA.options[19].value = "8"; 
     selectAA.options[20].text = "Gestão da Unidade";
     selectAA.options[20].value = "9"; 
     selectAA.options[21].text = "Gestão documental e controle de demandas externas";
     selectAA.options[21].value = "10"; 
     
     for (var i = 0; i <= selectAA.options.length; i++) {
      selectAA.options[i].style.display = "block";
     }
   } else {
    for (var i = 0; i <= selectAA.options.length; i++) {
      selectAA.options[i].style.display = "none";
     }   
   }
});

primeiraColuna.addEventListener('change', function() {
   var selectDDD = document.getElementById("DDD");
   var selectedOption = selectDDD.options[selectDDD.selectedIndex];
   var selectDDDText = selectedOption.text;
   var selectPP = document.getElementById("PP");

   if (selectDDDText == "Apuração" || selectDDDText == "Avaliação" || selectDDDText == "Consultoria") {
     selectPP.options[0].text = "-- id do produto --";
     selectPP.options[0].value = "";
     selectPP.options[1].text = "Recomendações cadastradas";
     selectPP.options[1].value = "1";
     selectPP.options[2].text = "Escopo da Auditoria";
     selectPP.options[2].value = "1";
     selectPP.options[3].text = "Papéis de Trabalho";
     selectPP.options[3].value = "2";
     selectPP.options[4].text = "Matriz de Achados";
     selectPP.options[4].value = "3";
     selectPP.options[5].text = "Análise Preliminar";
     selectPP.options[5].value = "1";
     selectPP.options[6].text = "Matriz de Riscos";
     selectPP.options[6].value = "2";
     selectPP.options[7].text = "Matriz de Planejamento";
     selectPP.options[7].value = "3";
     selectPP.options[8].text = "Relatório Preliminar";
     selectPP.options[8].value = "1";
     selectPP.options[9].text = "Relatório Final";
     selectPP.options[9].value = "2";     
     
     for (var i = 10; i < selectPP.options.length; i++) {
      selectPP.options[i].style.display = "none";
     }
     for (var i = 0; i < 10; i++) {
      selectPP.options[i].style.display = "block";
     }
   } else if (selectDDDText == "Ausência") {
     selectPP.options[0].text = "-- id do produto --";
     selectPP.options[0].value = "";
     selectPP.options[1].text = "Atestado Médico";
     selectPP.options[1].value = "1";
     selectPP.options[2].text = "Férias";
     selectPP.options[2].value = "2";
     
     for (var i = 3; i < selectPP.options.length; i++) {
      selectPP.options[i].style.display = "none";
     }
     for (var i = 0; i < 3; i++) {
      selectPP.options[i].style.display = "block";
     }
   } else if (selectDDDText == "Capacitação" || selectDDDText == "Outros" || selectDDDText == "Participação em reuniões/GT" || selectDDDText == "Demandas Externas" || selectDDDText == "Demandas Extraordinárias") {
     selectPP.options[0].text = "-- id do produto --";
     selectPP.options[0].value = "";
     
     for (var i = 0; i < selectPP.options.length; i++) {
      selectPP.options[i].style.display = "none";
     }

   } else if (selectDDDText == "Demandas Administrativas") {
     selectPP.options[0].text = "-- id do produto --";
     selectPP.options[0].value = "";
     selectPP.options[1].text = "Normativo";
     selectPP.options[1].value = "1";
     selectPP.options[2].text = "Parecer";
     selectPP.options[2].value = "2";
     selectPP.options[3].text = "Manual";
     selectPP.options[3].value = "3";
     selectPP.options[4].text = "POP";
     selectPP.options[4].value = "4";
     
     for (var i = 5; i < selectPP.options.length; i++) {
      selectPP.options[i].style.display = "none";
     }
     for (var i = 0; i < 5; i++) {
      selectPP.options[i].style.display = "block";
     }
   } else if (selectDDDText == "Demandas de TIC") {
     selectPP.options[0].text = "-- id do produto --";
     selectPP.options[0].value = "";
     selectPP.options[1].text = "Aplicativo";
     selectPP.options[1].value = "1";
     selectPP.options[2].text = "Painel Gerencial";
     selectPP.options[2].value = "1";
     selectPP.options[3].text = "Consulta SQL";
     selectPP.options[3].value = "1";

     for (var i = 4; i < selectPP.options.length; i++) {
      selectPP.options[i].style.display = "none";
     }
     for (var i = 0; i < 4; i++) {
      selectPP.options[i].style.display = "block";
     }
   } else if (selectDDDText == "Monitoramento") {
     selectPP.options[0].text = "-- id do produto --";
     selectPP.options[0].value = "";
     selectPP.options[1].text = "Benefício contabilizado";
     selectPP.options[1].value = "1";
     selectPP.options[2].text = "Recomendação monitorada";
     selectPP.options[2].value = "1";
     
     for (var i = 3; i < selectPP.options.length; i++) {
      selectPP.options[i].style.display = "none";
     }
     for (var i = 0; i < 3; i++) {
      selectPP.options[i].style.display = "block";
     }
   } else if (selectDDDText == "PGMQ") {
     selectPP.options[0].text = "-- id do produto --";
     selectPP.options[0].value = "";
     selectPP.options[1].text = "Matriz de Avaliação";
     selectPP.options[1].value = "1";
     selectPP.options[2].text = "Avaliação IA-CM";
     selectPP.options[2].value = "2";
     selectPP.options[3].text = "Plano de Ação";
     selectPP.options[3].value = "1";
     selectPP.options[4].text = "Relatório de Avaliação IA-CM";
     selectPP.options[4].value = "1";
     
     for (var i = 5; i < selectPP.options.length; i++) {
      selectPP.options[i].style.display = "none";
     }
     for (var i = 0; i < 5; i++) {
      selectPP.options[i].style.display = "block";
     }
   } else if (selectDDDText == "Planejamento Anual") {
     selectPP.options[0].text = "-- id do produto --";
     selectPP.options[0].value = "";
     selectPP.options[1].text = "PAINT Preliminar";
     selectPP.options[1].value = "1";
     selectPP.options[2].text = "PAINT Definitivo";
     selectPP.options[2].value = "2";
     selectPP.options[3].text = "RAINT Preliminar";
     selectPP.options[3].value = "1";
     selectPP.options[4].text = "RAINT Definitivo";
     selectPP.options[4].value = "2";
     selectPP.options[5].text = "Universo de Auditoria";
     selectPP.options[5].value = "1";
     
     for (var i = 6; i < selectPP.options.length; i++) {
      selectPP.options[i].style.display = "none";
     }
     for (var i = 0; i < 6; i++) {
      selectPP.options[i].style.display = "block";
     }
   }  else {
    for (var i = 0; i < selectPP.options.length; i++) {
      selectPP.options[i].style.display = "block";
     }
   }  
   
});

YYYY.addEventListener('change', ()=> {
   let arr = []
   let str = ''
   
   possibilidades.forEach(element => {
      if(element.ano == YYYY.value || element.ano == '') arr.push(element)
   });

   arr.map(item => str += `<option value="${item.value}">${item.text}</option>`)

   AA.innerHTML = str
});

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
   var selectAT = document.getElementById("AT");
   var selectDDD = document.getElementById("DDD");
   var selectPP = document.getElementById("PP");

   for (var i = 0; i < selectPP.options.length; i++) {
      selectPP.options[i].style.display = "block";
   }
   for (var i = 0; i < selectDDD.options.length; i++) {
      selectDDD.options[i].style.display = "block";
   }
   for (var i = 0; i < selectAT.options.length; i++) {
      selectAT.options[i].style.display = "block";
   }
});

function copiarResultado() {
   if(Ret.value == "") return;

   Ret.select();
   navigator.clipboard.writeText(Ret.value); 
}