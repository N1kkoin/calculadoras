 
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
