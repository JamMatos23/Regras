const YYYY = document.getElementById('YYYY');
const AA = document.getElementById('AA');
const PP = document.getElementById('PP');
const AT = document.getElementById('AT');
const DDD = document.getElementById('DDD');
const SP = document.getElementById('SP');
const IPP = document.getElementById('IPP')
const enviar = document.getElementById('gerar');
const apagar = document.getElementById('reset');
const Ret = document.getElementById('Ret');

var primeiraColuna = document.getElementById('DDD');
var segundaColuna = document.getElementById('AT');
var terceiraColuna = document.getElementById('PP');

// Desabilita o elemento select
const selects = document.querySelectorAll("select");
selects.forEach(select => select.disabled = true);

// Carrega o arquivo Excel usando a biblioteca SheetJS js-xlsx
const url = "De-Para.xlsx";
const xhr = new XMLHttpRequest();
xhr.open("GET", url, true);
xhr.responseType = "arraybuffer";
xhr.onload = function(e) {
  const arraybuffer = xhr.response;
  const data = new Uint8Array(arraybuffer);
  const workbook = XLSX.read(data, {type: "array"});
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // Extrai os dados do arquivo Excel
  const rows = XLSX.utils.sheet_to_json(worksheet, {header: 1});

  // Encontra o índice da coluna de "CodDemanda", "TipoDemanda", "CodAtividade" e "Atividade"
  const codIndex = rows[1].indexOf("CodDemanda");
  const tipoIndex = rows[1].indexOf("Tipo de Demanda");
  const codAtividadeIndex = rows[1].indexOf("CodAtividade");
  const atividadeIndex = rows[1].indexOf("Atividade");

  // Extrai as opções e valores dos dados da coluna para o elemento select DDD
  const optionsDDD = [];
  const valuesDDD = [];
  for (let i = 1; i < rows.length; i++) {
    const cod = rows[i][codIndex];
    const tipo = rows[i][tipoIndex];

    // Verifica se os valores são válidos
    if (cod === undefined || tipo === undefined) {
      console.log("Valor inválido encontrado, parando o loop");
      break;
    }

    if (cod && tipo && !optionsDDD.includes(tipo)) {
      optionsDDD.push(tipo);
      valuesDDD.push(cod);
    }
  }

  // Preenche o elemento select DDD com as opções e valores
const selectDDD = document.getElementById("DDD");
for (let i = 0; i < optionsDDD.length; i++) {
  const option = document.createElement("option");
  option.text = optionsDDD[i];
  option.value = valuesDDD[i];
  if (isNaN(option.value)) {
    option.value = '';
  }
  selectDDD.add(option);
}

  // Extrai as opções e valores dos dados da coluna para o elemento select AT
  const optionsAT = [];
  const valuesAT = [];
  const dddValues = [];
  for (let i = 1; i < rows.length; i++) {
    const codAtividade = rows[i][codAtividadeIndex];
    const atividade = rows[i][atividadeIndex];
    const codDemanda = rows[i][codIndex];

    // Verifica se os valores são válidos
    if (codAtividade === undefined || atividade === undefined) {
      console.log("Valor inválido encontrado, parando o loop");
      break;
    }

    if (codAtividade && atividade && !optionsAT.includes(atividade)) {
      optionsAT.push(atividade);
      valuesAT.push(codAtividade);
      dddValues.push(codDemanda);
    }
  }

  // Preenche o elemento select AT com as opções e valores
  const selectAT = document.getElementById("AT");
  for (let i = 0; i < optionsAT.length; i++) {
    const option = document.createElement("option");
    option.text = optionsAT[i];
    option.value = valuesAT[i];
    option.setAttribute("data-ddd", dddValues[i]);
    selectAT.add(option);
  }

  // Habilita os elementos select
  document.getElementById("DDD").disabled = false;
};
xhr.send();

primeiraColuna.addEventListener('change', function() {

  var selectDDD = document.getElementById("DDD");
  var selectAT = document.getElementById("AT");

  if (selectDDD.value !== '') {
    document.getElementById("AT").disabled = false;

  } else {
      document.getElementById("AT").disabled = true;

  }
});

// Adiciona um evento de mudança de valor 
IPP.addEventListener('change', function() { 
  // Obtém o valor do input 
  var valor = IPP.value;
  // Verifica se o valor é um número e tem menos de 7 dígitos 
  if (isNaN(valor) === false && valor.length < 7) { 
    // Mostra um alerta 
    alert("O número tem menos de 7 dígitos"); 
  }
});

/*
IPP.addEventListener('input', function() {
  if (this.value.length > 7) {
    this.value = this.value.slice(0, 7);
  }
});
*/

YYYY.addEventListener('change', ()=> {
   let arr = []
   let str = ''
   
   possibilidades.forEach(element => {
      if(element.ano == YYYY.value || element.ano == '') arr.push(element)
   });

   arr.map(item => str += `<option value="${item.value}">${item.text}</option>`)

   AA.innerHTML = str
});

// Adiciona um evento de clique 
enviar.addEventListener("click", function(event) { // Previne o comportamento padrão do botão 
  event.preventDefault();

  // Aqui começa o seu código 
  const PAA = AA.value; const PYYYY = YYYY.value; const PPP = PP.value; const PDDD = DDD.value; const PAT = AT.value; const PSP = SP.value; const PIPP = IPP.value;

  Ret.value = ('<demanda>'+PDDD+'</demanda><atividade>'+PAT+'</atividade><produto>'+PPP+'</produto><idEaud>'+PIPP+'</idEaud><anoAcao>'+PYYYY+'</anoAcao><idAcao>'+PAA+'</idAcao><idSprint>'+PSP+'</idSprint>') 
});
  

apagar.addEventListener("click", event => {
   event.preventDefault()
   AA.value = ''
   YYYY.value = ''
   PP.value = ''
   DDD.value = ''
   AT.value = ''
   SP.value = ''
   IPP.value = ''
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