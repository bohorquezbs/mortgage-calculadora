document.querySelector('.js-form').addEventListener('submit', function (e) {
  e.preventDefault();

  // Obtener valores del formulario
  const amount = parseFloat(document.querySelector('amount').value);
  const term = parseInt(document.querySelector('term').value);
  const rate = parseFloat(document.querySelector('rate').value);
  const isRepayment = document.querySelector('repayment').checked;
  const isInterestOnly = document.querySelector('interest-only').checked;

  // Validación simple
  if (!amount || !term || !rate) {
    alert('Por favor completa todos los campos.');
    return;
  }

  // Calcular la tasa mensual
  const monthlyRate = rate / 100 / 12;
  const numberOfPayments = term * 12;

  let monthlyPayment = 0;
  let totalPayment = 0;

  // Cálculo de la fórmula para "Repayment"
  if (isRepayment) {
    monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    totalPayment = monthlyPayment * numberOfPayments;
  }

  // Cálculo de "Interest Only"
  if (isInterestOnly) {
    monthlyPayment = (amount * rate / 100 / 12);
    totalPayment = monthlyPayment * numberOfPayments;
  }

  // Mostrar el resultado
  displayResult(monthlyPayment.toFixed(2), totalPayment.toFixed(2));
});

// Función para mostrar el resultado en el DOM
function displayResult(monthlyPayment, totalPayment) {
  const resultCard = document.querySelector('.card--result__empty');
  resultCard.innerHTML = `
  <div class="card--result__filled">
            <p class="title">Your results</p>
            <p class="info">
              Your results are shown below based on the information you provided.
              To adjust the results, edit the form and click “calculate
              repayments” again.
            </p>
            <div class="result--container">
              <p>Your monthly repayments</p>
              <p class="js-monthly result--container__monthly">£${monthlyPayment}</p>
              <hr class="horizontal-rule" />
              <p class="above-total">Total you'll pay over the term</p>
              <p class="js-total result--container__total">£${totalPayment }</p>
            </div>
          </div>
  
        `;
}
