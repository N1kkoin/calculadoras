let custoTotal = 0;



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

        tempodiasSpan.textContent = diferencaDias;
        tempomesesSpan.textContent = diferencaMeses;
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






//FORMATAÇÃO DINHEIRO R$ ----------------------------------------------------------------------------------------------------------

// Adicionar eventos de entrada aos campos de valor pago e custos
const valorPagoInput = document.querySelector('.valorpago');
valorPagoInput.addEventListener('input', () => {
    formatInputCurrency(valorPagoInput);
    calcularCustoTotal();
});

const custosInput = document.querySelector('.custos');
custosInput.addEventListener('input', () => {
    formatInputCurrency(custosInput);
    calcularCustoTotal();
});

const custosvalorVendaInput = document.querySelector('.valorvenda');
custosvalorVendaInput.addEventListener('input', () => {
    formatInputCurrency(custosvalorVendaInput);
    calcularCustoTotal();
});

const deducoesInput = document.querySelector('.deducoes');
deducoesInput.addEventListener('input', () => {
    formatInputCurrency(deducoesInput);
    calcularCustoTotal();
});





// Eventos para calcular o custo total e o lucro final quando os campos são atualizados
document.querySelector('.valorpago').addEventListener('keyup', function() {
    calcularCustoTotal();
    calcularLucroFinal();
    calcularLucratividadeTotal(); // Atualize a lucratividade total quando um dos campos for atualizado
});
document.querySelector('.custos').addEventListener('keyup', function() {
    calcularCustoTotal();
    calcularLucroFinal();
    calcularLucratividadeTotal(); // Atualize a lucratividade total quando um dos campos for atualizado
});
document.querySelector('.valorvenda').addEventListener('keyup', function() {
    calcularLucroFinal();
    calcularLucratividadeTotal(); // Atualize a lucratividade total quando um dos campos for atualizado
});
document.querySelector('.deducoes').addEventListener('keyup', function() {
    calcularLucroFinal();
    calcularLucratividadeTotal(); // Atualize a lucratividade total quando um dos campos for atualizado
});



// VALOR PAGO + CUSTOS = CUSTOTOTAL -----------------------------------------------------------------------------------------------------------------

// Função para calcular o custo total
function calcularCustoTotal() {
    const valorPagoInput = document.querySelector('.valorpago');
    const custosInput = document.querySelector('.custos');
    const custoTotalElement = document.getElementById('custototal');

    // Obtém os valores formatados dos campos de entrada
    const valorPagoFormatted = valorPagoInput.value || '0'; // Se estiver vazio, considera como zero
    const custosFormatted = custosInput.value || '0'; // Se estiver vazio, considera como zero

    // Converte os valores formatados em números
    const valorPago = parseCurrency(valorPagoFormatted);
    const custos = parseCurrency(custosFormatted);

    custoTotal = valorPago + custos; // Armazena o valor do custo total na variável global

    // Exibe o custo total formatado
    custoTotalElement.textContent = formatCurrency(custoTotal);

    // Chama a função para recalcular o lucro final
    calcularLucroFinal();
}

// Função para analisar um valor monetário formatado (R$) e retornar um número
function parseCurrency(currencyString) {
    // Remove o "R$" e quaisquer separadores de milhares
    const numericString = currencyString.replace(/\D/g, '');

    // Converte a string numérica para um número de ponto flutuante
    return parseFloat(numericString) / 100;
}

// Função para formatar um número como moeda brasileira (R$)
function formatCurrency(value) {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
    });
}

// Função para formatar um campo de entrada como moeda brasileira (R$)
function formatInputCurrency(input) {
    // Remove todos os caracteres não numéricos
    var value = input.value.replace(/\D/g, '');

    // Converta o valor em número
    var numericValue = parseFloat(value) / 100;

    // Formate o valor como moeda brasileira (R$) com separadores de milhares
    if (!isNaN(numericValue)) {
        input.value = formatCurrency(numericValue);
    }
}

// Calcular o custo total na carga da página
calcularCustoTotal();




// LUCRO FINAL ----------------------------------------------------------------------------------------------------
 

// VALOR VENDA - DEDUÇÕES - CUSTO TOTAL = LUCRO FINAL
function calcularLucroFinal() {
    const valorVendaInput = document.querySelector('.valorvenda');
    const deducoesInput = document.querySelector('.deducoes');
    const lucroFinalElement = document.getElementById('lucrofinal');

    // Obtém os valores formatados dos campos de entrada
    const valorVendaFormatted = valorVendaInput.value || '0'; // Se estiver vazio, considera como zero
    const deducoesFormatted = deducoesInput.value || '0'; // Se estiver vazio, considera como zero

    // Converte os valores formatados em números
    const valorVenda = parseCurrency(valorVendaFormatted);
    const deducoes = parseCurrency(deducoesFormatted);

    const lucroFinal = (valorVenda - deducoes - custoTotal).toFixed(2); // Inclui o custoTotal na fórmula e arredonda para 2 casas decimais

  
    // Adicione "R$" ao valor do lucro final
    lucroFinalElement.textContent ="R$ " + formatCurrency(lucroFinal);
}

// Eventos para calcular o custo total e o lucro final
document.querySelector('.valorpago').addEventListener('keyup', calcularCustoTotal);
document.querySelector('.custos').addEventListener('keyup', calcularCustoTotal);
document.querySelector('.valorvenda').addEventListener('keyup', calcularLucroFinal);
document.querySelector('.deducoes').addEventListener('keyup', calcularLucroFinal);

// Calcular o custo total na carga da página
calcularCustoTotal();

// Calcular o lucro final na carga da página
calcularLucroFinal();



// LUCRATIVIDADE TOTAL -------------------------------------------------------------------------------------
function calcularLucratividadeTotal() {
    // Obtenha o valor do lucro final do elemento com o id "lucrofinal"
    const lucroFinalElement = document.getElementById('lucrofinal');
    const lucroFinal = parseFloat(lucroFinalElement.textContent.replace(/[^\d.-]/g, ''));

    // Obtenha o valor do custo total do elemento com o id "custototal"
    const custoTotalElement = document.getElementById('custototal');
    const custoTotal = parseFloat(custoTotalElement.textContent.replace(/[^\d.-]/g, ''));

    // Calcule a lucratividade total
    const lucratividadeTotal = (lucroFinal / custoTotal) * 100; // Em porcentagem

    // Exiba a lucratividade total no elemento com o id "lucratividadetotal" formatada como porcentagem
    const lucratividadeTotalElement = document.getElementById('lucratividadetotal');
    lucratividadeTotalElement.textContent = lucratividadeTotal.toLocaleString('pt-BR', { style: 'percent', minimumFractionDigits: 2 });
}


// Eventos para calcular a lucratividade total quando os campos são atualizados
document.querySelector('.valorpago').addEventListener('keyup', calcularLucratividadeTotal);
document.querySelector('.custos').addEventListener('keyup', calcularLucratividadeTotal);
document.querySelector('.valorvenda').addEventListener('keyup', calcularLucratividadeTotal);
document.querySelector('.deducoes').addEventListener('keyup', calcularLucratividadeTotal);

// Calcular a lucratividade total na carga da página
calcularLucratividadeTotal();

//LUCRATIVIDADE DIAS MESES E ANOS ------------------------------------------------------------------------------------------------------------------------------

// ...

// Função para calcular as lucratividades em dias, meses e anos
function calcularLucratividades() {
    const lucratividadetotalElement = document.getElementById("lucratividadetotal");
    const tempodiasElement = document.getElementById("tempodias");

    // Obtenha os valores necessários
    const lucratividadetotal = parseFloat(lucratividadetotalElement.textContent) / 100; // Converta para decimal
    const tempodias = parseFloat(tempodiasElement.textContent);

    console.log("Lucratividade Total:", lucratividadetotal);
    console.log("Tempo em dias:", tempodias);

    // Calcule as lucratividades
    const lucratividadedias = Math.pow(1 + lucratividadetotal, 1 / tempodias) - 1;
    const lucratividademeses = Math.pow(1 + lucratividadedias, 30) - 1;
    const lucratividadeanos = Math.pow(1 + lucratividademeses, 12) - 1;

    console.log("Lucratividade em Dias:", lucratividadedias);
    console.log("Lucratividade em Meses:", lucratividademeses);
    console.log("Lucratividade em Anos:", lucratividadeanos);

    // Atualize os elementos com os resultados
    document.getElementById("lucratividadedias").textContent = (lucratividadedias * 100).toFixed(3) + "%";
    document.getElementById("lucratividademeses").textContent = (lucratividademeses * 100).toFixed(3) + "%";
    document.getElementById("lucratividadeanos").textContent = (lucratividadeanos * 100).toFixed(3) + "%";
}

// Atualize as lucratividades quando algum número relevante é atualizado
function atualizarLucratividades() {
    calcularCustoTotal();
    calcularLucroFinal();
    calcularLucratividadeTotal();
    calcularLucratividades();
}

// Adicione eventos de mudança de entrada aos campos que afetam os cálculos
document.querySelector('.valorpago').addEventListener('keyup', atualizarLucratividades);
document.querySelector('.custos').addEventListener('keyup', atualizarLucratividades);
document.querySelector('.valorvenda').addEventListener('keyup', atualizarLucratividades);
document.querySelector('.deducoes').addEventListener('keyup', atualizarLucratividades);
document.querySelector('.datacompra').addEventListener('change', atualizarLucratividades);
document.querySelector('.datavenda').addEventListener('change', atualizarLucratividades);

// Calcular o custo total e lucratividades na carga da página
calcularCustoTotal();
calcularLucratividades();

// ...
