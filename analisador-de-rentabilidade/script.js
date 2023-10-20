
// TAXA SELIC ---------------------------------------------------

// Função para buscar e exibir a taxa SELIC mais recente
function fetchSelicValue() {
    fetch("https://api.bcb.gov.br/dados/serie/bcdata.sgs.1178/dados?formato=json")
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                // Reverte a ordem dos dados e pega o primeiro valor para obter o mais recente
                data.reverse();
                const selicValue = data[0].valor;
                document.getElementById("selicValue").textContent = selicValue;
            } else {
                document.getElementById("selicValue").textContent = "Valores da taxa SELIC não encontrados.";
            }
        })
        .catch(error => {
            console.error("Erro ao buscar a taxa SELIC: " + error);
            document.getElementById("selicValue").textContent = "Erro ao buscar a taxa SELIC.";
        });
}

// Chama a função para buscar a taxa SELIC mais recente
fetchSelicValue();





//CONTA PARA POUPANÇA MENSAL --------------------------------------------------------------------------------
function calcularResultado() {
    // Obtenha o valor do elemento com o id "selicValue"
    var selicValueElement = document.getElementById("selicValue");
    var selicValue = parseFloat(selicValueElement.textContent) / 100;

    // Calcule o resultado
    var resultado = Math.pow(1 + (selicValue * 0.7), 1 / 12) - 1;

    // Exiba o resultado no elemento com o id "poupamensa"
    var poupamensaElement = document.getElementById("poupamensa");
    poupamensaElement.textContent = (resultado * 100).toFixed(3); // Converte para porcentagem e limita o número de casas decimais
}

// Atualize o resultado periodicamente (por exemplo, a cada segundo)
setInterval(calcularResultado, 1000);


// TEMPO (DIAS) -------------------------------------------------------------------------------------

// Função para calcular a diferença em dias entre duas datas
function calcularDiferencaDias() {
    const dataCompra = new Date(document.querySelector('.datacompra').value);
    const dataVenda = new Date(document.querySelector('.datavenda').value);

    const diferencaDias = Math.abs((dataVenda - dataCompra) / (1000 * 60 * 60 * 24));

    document.getElementById('tempodias').textContent = diferencaDias + ' dias';
}

// Adicionar um evento onchange para os campos de data
document.querySelector('.datacompra').addEventListener('change', calcularDiferencaDias);
document.querySelector('.datavenda').addEventListener('change', calcularDiferencaDias);


//  TEMPO (MESES) ----------------------------------------------------------------------------------------------------

 // Função para calcular a diferença em meses entre duas datas
 function calcularDiferencaMeses() {
    const dataCompra = new Date(document.querySelector('.datacompra').value);
    const dataVenda = new Date(document.querySelector('.datavenda').value);

    const diferencaMeses = (dataVenda.getMonth() + 1) + (dataVenda.getFullYear() - dataCompra.getFullYear()) * 12 - (dataCompra.getMonth() + 1);

    document.getElementById('tempomeses').textContent = diferencaMeses + ' meses';
  }

  // Adicionar um evento onchange para os campos de data
  document.querySelector('.datacompra').addEventListener('change', calcularDiferencaMeses);
  document.querySelector('.datavenda').addEventListener('change', calcularDiferencaMeses);


  //PLACEHOLDER TEMPO DIA E MESES ------------------------------------------------------------------------------------------------------------------------------------

  // Função para calcular a diferença em meses entre duas datas
  function calcularDiferencaMeses() {
    const dataCompra = new Date(document.querySelector('.datacompra').value);
    const dataVenda = new Date(document.querySelector('.datavenda').value);
    const tempodiasSpan = document.getElementById('tempodias');
    const tempomesesSpan = document.getElementById('tempomeses');

    if (!isNaN(dataCompra) && !isNaN(dataVenda)) {
      const diferencaDias = Math.abs((dataVenda - dataCompra) / (1000 * 60 * 60 * 24));
      const diferencaMeses = (dataVenda.getMonth() + 1) + (dataVenda.getFullYear() - dataCompra.getFullYear()) * 12 - (dataCompra.getMonth() + 1);

      tempodiasSpan.textContent = diferencaDias + ' dias';
      tempomesesSpan.textContent = diferencaMeses + ' meses';
    } else {
      tempodiasSpan.textContent = 'Tempo em dias';
      tempomesesSpan.textContent = 'Tempo em meses';
    }
  }

  // Adicionar um evento onchange para os campos de data
  document.querySelector('.datacompra').addEventListener('change', calcularDiferencaMeses);
  document.querySelector('.datavenda').addEventListener('change', calcularDiferencaMeses);

  // Calcular a diferença de meses na carga da página
  calcularDiferencaMeses();

