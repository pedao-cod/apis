async function consultarCEP() {
  const CEP = document.getElementById("CEP").value;
  const localidade = document.getElementById("localidade");
  const Logradouro = document.getElementById("Logradouro");
  const bairro = document.getElementById("bairro");
  const uf = document.getElementById("uf");
  const response = await fetch(`https://opencep.com/v1/${CEP}`);

  const dadosCEP = await response.json();

  Logradouro.value = dadosCEP.logradouro;
  bairro.value = dadosCEP.bairro;
  localidade.value = dadosCEP.localidade;
  uf.value = dadosCEP.uf;
}

// CLIMA
/*  
async function consultarClima{
    const clima 
}
*/

//dolar

let cotacaoDoDia = 0;

async function consultarDolar() {
  const nomeMoeda = document.getElementById("nomeMoeda");
  const valorAtual = document.getElementById("valorAtual");
  const valorMaximo = document.getElementById("valorMaximo");
  const cotacaoAtual = document.getElementById("cotacaoAtual");

  try {
    const response = await fetch(
      "https://economia.awesomeapi.com.br/json/last/USD-BRL",
    );
    const dados = await response.json();
    const dolar = dados.USDBRL;
    nomeMoeda.value = dolar.name;
    valorAtual.value = parseFloat(dolar.bid).toFixed(2);
    valorMaximo.value = parseFloat(dolar.high).toFixed(2);
    cotacaoDoDia = parseFloat(dolar.bid);
    cotacaoAtual.value = cotacaoDoDia.toFixed(2);
  } catch (error) {
    nomeMoeda.value = "Erro ao carregar";
    valorAtual.value = "Erro";
    valorMaximo.value = "Erro";
    cotacaoAtual.value = "Erro";
  }
}
consultarDolar();

function converter() {
  const inputDolar = document.getElementById("valorDolar");
  const inputReal = document.getElementById("valorReal");

  const valorDigitado = parseFloat(inputDolar.value);

  if (isNaN(valorDigitado)) {
    inputReal.value = "";
    return;
  }
  const resultado = valorDigitado * cotacaoDoDia;
  inputReal.value = resultado.toFixed(2);
}

//paises

async function consultarPais() {
  const inputPais = document.getElementById("nomePais").value;
  const campoCapital = document.getElementById("capitalPais");
  const campoPopulacao = document.getElementById("populacaoPais");
  const imgBandeira = document.getElementById("bandeira");

  if (inputPais === "") {
    alert("Por favor, digite o nome de um país!");
    return;
  }

  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${inputPais}`,
    );

    if (!response.ok) throw new Error("País não encontrado");

    const dados = await response.json();

    const pais = dados[0];

    campoCapital.value = pais.capital ? pais.capital[0] : "Não possui";

    campoPopulacao.value = pais.population.toLocaleString("pt-BR");

    imgBandeira.src = pais.flags.svg;
    imgBandeira.style.display = "block";
  } catch (error) {
    campoCapital.value = "Erro: " + error.message;
    campoPopulacao.value = "-";
    imgBandeira.style.display = "none";
  }
}

//dog fotos

async function gerarCachorro() {
  const imgCachorro = document.getElementById("fotoCachorro");
  const msgCarregando = document.getElementById("mensagemCarregando");
  const botao = document.getElementById("btnCachorro");
  msgCarregando.style.display = "block";
  imgCachorro.style.display = "none";
  botao.value = "Buscando...";
  botao.disabled = true;

  try {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const dados = await response.json();

    imgCachorro.src = dados.message;
    imgCachorro.onload = function () {
      msgCarregando.style.display = "none";
      imgCachorro.style.display = "block";
      botao.value = "Gerar Outro Doguinho!";
      botao.disabled = false;
    };
  } catch (error) {
    msgCarregando.innerText = "Erro ao buscar a imagem. Tente novamente!";
    botao.value = "Tentar Novamente";
    botao.disabled = false;
  }
}

// clima

async function consultarClima() {
  const inputCidade = document.getElementById("nomeCidade").value;
  const campoTemp = document.getElementById("temperatura");
  const campoVento = document.getElementById("vento");

  if (inputCidade === "") {
    alert("Por favor, digite o nome de uma cidade!");
    return;
  }
  campoTemp.value = "Buscando...";
  campoVento.value = "Buscando...";

  try {
    const urlGeocoding = `https://geocoding-api.open-meteo.com/v1/search?name=${inputCidade}&count=1&language=pt`;
    const resGeo = await fetch(urlGeocoding);
    const dadosGeo = await resGeo.json();

    if (!dadosGeo.results || dadosGeo.results.length === 0) {
      throw new Error("Cidade não encontrada");
    }

    const lat = dadosGeo.results[0].latitude;
    const lon = dadosGeo.results[0].longitude;

    const urlClima = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
    const resClima = await fetch(urlClima);
    const dadosClima = await resClima.json();

    const climaAtual = dadosClima.current_weather;

    campoTemp.value = climaAtual.temperature + " °C";
    campoVento.value = climaAtual.windspeed + " km/h";
  } catch (error) {
    campoTemp.value = "Erro: " + error.message;
    campoVento.value = "-";
  }
}
