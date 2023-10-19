 
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


//DATA --------------------------------------------------------------------


    // Função para validar o formato da data
    function validarData(inputElement) {
        var data = inputElement.value;
        var pattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        
        if (pattern.test(data)) {
            var day = parseInt(RegExp.$1, 10);
            var month = parseInt(RegExp.$2, 10);
            var year = parseInt(RegExp.$3, 10);

            if (day >= 1 && day <= 31 && month >= 1 && month <= 12) {
                // A data é válida
                inputElement.setCustomValidity('');
            } else {
                inputElement.setCustomValidity('Data inválida. Certifique-se de que o dia, mês e ano são válidos.');
            }
        } else {
            inputElement.setCustomValidity('Formato de data inválido. Use o formato dd/mm/aaaa.');
        }
    }

    // Adicionar validação aos campos de entrada
    var dataCompraInput = document.getElementById("dataCompra");
    dataCompraInput.addEventListener("input", function() {
        validarData(dataCompraInput);
    });

    var dataVendaInput = document.getElementById("dataVenda");
    dataVendaInput.addEventListener("input", function() {
        validarData(dataVendaInput);
    });

