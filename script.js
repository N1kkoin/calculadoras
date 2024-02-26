function openTab(evt, tabName) {
    // Declara todas as variáveis
    var i, tabcontent, tablinks;
  
    // Obtém todos os elementos com class="tabcontent" e os esconde
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Obtém todos os elementos com class="tablink" e remove a classe "active"
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Mostra a aba atual e adiciona a classe "active" ao botão que abriu a aba
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }
  



  // etanol =------------------------------------------------------------------------------------------------------------------------------------------------------------

  function calculate() {
    var method = document.getElementById('method').value;
    var etanolPrice = document.getElementById('etanolPrice').value;
    var gasolinaPrice = document.getElementById('gasolinaPrice').value;
    var result = document.getElementById('result');

    // Removendo o símbolo "R$" dos valores
    etanolPrice = etanolPrice.replace('R$ ', '').replace(',', '.');
    gasolinaPrice = gasolinaPrice.replace('R$ ', '').replace(',', '.');

    if (method === "1") {
        if (etanolPrice && gasolinaPrice) {
            etanolPrice = parseFloat(etanolPrice);
            gasolinaPrice = parseFloat(gasolinaPrice);
            var ratio = etanolPrice / (gasolinaPrice * 0.7);

            if (ratio < 1) {
                result.innerHTML = 'Melhor abastecer com Etanol';
            } else {
                result.innerHTML = 'Melhor abastecer com Gasolina';
            }
        } else {
            result.innerHTML = 'Por favor, insira ambos os preços';
        }
    } else if (method === "2") {
        if (gasolinaPrice) {
            gasolinaPrice = parseFloat(gasolinaPrice);
            var maxEtanolPrice = gasolinaPrice * 0.69;
            // Ajustando o cálculo para arredondar para duas casas decimais
            maxEtanolPrice = Math.round(maxEtanolPrice * 100) / 100;
            result.innerHTML = 'Preço máximo do Etanol para compensar: ' + maxEtanolPrice.toFixed(2);
        } else {
            result.innerHTML = 'Por favor, insira o preço da gasolina';
        }
    }
}

function addCurrencySymbol(input) {
    var currentValue = input.value.trim();
    if (!currentValue || currentValue === 'R$ ') {
        input.value = ''; // Set the value to 'R$ ' if it's empty or contains only 'R$ '
    } else if (!currentValue.startsWith('R$')) {
        input.value = 'R$ ' + currentValue.replace(/[^\d,]/g, ''); // Allow only numbers and commas
    }
}


function removeCurrencySymbol(input) {
    var currentValue = input.value.trim();
    if (!currentValue.startsWith('R$ ')) {
        // If the value doesn't start with 'R$ ', remove any non-numeric characters
        input.value = currentValue.replace(/[^\d.,]/g, '');
    }
}



window.onload = function() {
    var inputs = document.querySelectorAll('#etanolPrice, #gasolinaPrice');
    inputs.forEach(function(input) {
        input.addEventListener('input', function() {
            addCurrencySymbol(input);
        });

        input.addEventListener('blur', function() {
            removeCurrencySymbol(input);
        });

        input.addEventListener('focus', function() {
            addCurrencySymbol(input);
        });

        addCurrencySymbol(input); // Adiciona o símbolo "R$" se já existir um valor
    });
};

function methodChange() {
    var method = document.getElementById('method').value;
    var etanolInput = document.getElementById('etanolPrice');
    if (method === "2") {
        etanolInput.style.display = 'none';
    } else {
        etanolInput.style.display = 'block';
    }
}

methodChange();


/* perfil financeiro --------------------------------------------------------------------------------------------------------------------------------------------------------------- */

function calcularPontuacao() {
    // Função para obter o valor selecionado de um grupo de botões de rádio
    function obterValorSelecionado(name) {
        const elementos = document.getElementsByName(name);

        for (const elemento of elementos) {
            if (elemento.checked) {
                return parseInt(elemento.value);
            }
        }

        return 0; // Retornar 0 se nenhum botão estiver selecionado
    }

    // Função para verificar se todas as perguntas foram respondidas
    function todasPerguntasRespondidas() {
        const perguntas = ['q1', 'q2', 'q3', 'q4', 'q5'];
        let todasRespondidas = true;

        for (const pergunta of perguntas) {
            const pontuacao = obterValorSelecionado(pergunta);

            if (pontuacao === 0) {
                todasRespondidas = false;
                // Destacar visualmente o fieldset que falta responder
                document.querySelector(`fieldset[data-pergunta="${pergunta}"]`).style.border = '1px solid #ff6666';
            } else {
                // Resetar o estilo do fieldset caso a pergunta tenha sido respondida
                document.querySelector(`fieldset[data-pergunta="${pergunta}"]`).style.border = '1px solid #d5dcf1';
            }
        }

        return todasRespondidas;
    }

    // Verifica se todas as perguntas foram respondidas
    if (!todasPerguntasRespondidas()) {
        alert("Por favor, responda todas as perguntas antes de calcular a pontuação.");
        return;
    }

    // Restaurar o estilo de todos os fieldsets
    const fieldsets = document.querySelectorAll('fieldset');
    fieldsets.forEach(fieldset => {
        fieldset.style.border = '1px solid #d5dcf1';
    });

    // Obtém as respostas do formulário
    const q1 = obterValorSelecionado('q1');
    const q2 = obterValorSelecionado('q2');
    const q3 = obterValorSelecionado('q3');
    const q4 = obterValorSelecionado('q4');
    const q5 = obterValorSelecionado('q5');

    // Adicione mais perguntas conforme necessário e faça a soma total
    const pontuacaoTotal = q1 + q2 + q3 + q4 + q5;

    // Determina o texto com base na pontuação total
    let textoExibido = '';

    if (pontuacaoTotal <= 5) {
        textoExibido = `<div class="titulodoresultado"> Você marcou ${pontuacaoTotal}/55 pontos. </div> Texto para pontuação até 5 pontos.`;
    } else if (pontuacaoTotal <= 10) {
        textoExibido = `<div class="titulodoresultado"> Você marcou ${pontuacaoTotal}/55 pontos. </div>  Texto para pontuação até 10 pontos.`;
    } else if (pontuacaoTotal <= 15) {
        textoExibido = `<div class="titulodoresultado"> Você marcou ${pontuacaoTotal}/55 pontos. </div>  Texto para pontuação até 15 pontos.`;
    } else if (pontuacaoTotal <= 20) {
        textoExibido = `<div class="titulodoresultado"> Você marcou ${pontuacaoTotal}/55 pontos. </div>  Texto para pontuação até 20 pontos.`;
    } else if (pontuacaoTotal <= 25) {
        textoExibido = `<div class="titulodoresultado"> Você marcou ${pontuacaoTotal}/55 pontos. </div>  Texto para pontuação até 25 pontos.`;
    } else if (pontuacaoTotal <= 30) {
        textoExibido = `<div class="titulodoresultado"> Você marcou ${pontuacaoTotal}/55 pontos. </div>  Texto para pontuação até 30 pontos.`;
    } else if (pontuacaoTotal <= 35) {
        textoExibido = `<div class="titulodoresultado"> Você marcou ${pontuacaoTotal}/55 pontos. </div>  Texto para pontuação até 35 pontos.`;
    } else if (pontuacaoTotal <= 40) {
        textoExibido = `<div class="titulodoresultado"> Você marcou ${pontuacaoTotal}/55 pontos. </div>  Texto para pontuação até 40 pontos.`;
    } else if (pontuacaoTotal <= 45) {
        textoExibido = `<div class="titulodoresultado"> Você marcou ${pontuacaoTotal}/55 pontos. </div>  Texto para pontuação até 45 pontos.`;
    } else if (pontuacaoTotal <= 50) {
        textoExibido = `<div class="titulodoresultado"> Você marcou ${pontuacaoTotal}/55 pontos. </div>  Texto para pontuação até 50 pontos.`;
    } else if (pontuacaoTotal <= 54) {
        textoExibido = `<div class="titulodoresultado"> Você marcou ${pontuacaoTotal}/55 pontos. </div>  Texto para pontuação até 54 pontos.`;
    } else {
        textoExibido = `<div class="titulodoresultado"> Você marcou ${pontuacaoTotal}/55 pontos. </div>  </br>Texto para pontuação de 55 pontos.`;
    };

    // Exibe o texto na página
    document.getElementById('resultText').innerHTML = textoExibido;
}