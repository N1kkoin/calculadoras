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
