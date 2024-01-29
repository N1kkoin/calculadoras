function calculate() {
    var method = document.getElementById('method').value;
    var etanolPrice = document.getElementById('etanolPrice').value;
    var gasolinaPrice = document.getElementById('gasolinaPrice').value;
    var result = document.getElementById('result');

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
            // Adjusting the calculation to round to two decimal places
            maxEtanolPrice = Math.round(maxEtanolPrice * 100) / 100;
            result.innerHTML = 'Preço máximo do Etanol para compensar: ' + maxEtanolPrice.toFixed(2);
        } else {
            result.innerHTML = 'Por favor, insira o preço da gasolina';
        }
    }
}

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