// button disabled : btn-number-disabled
const blockTableMultiplyRandom = document.querySelector('.position-random');
const blockTableMultiply = document.querySelector('fieldset');

// choice table multiply

const tablesMultiply = document.querySelectorAll('.btn-number');

// choice table multiply random
const buttonTableRandom = document.querySelector('.table-number-random');
const tableMultiplyRandom = document.querySelector('.multiply-random');
const textMultiplyRandom = document.getElementById('text-multiply-random');

//choice number operation
const choiceOperation = document.querySelector(
  'input[name=operation]:checked'
).value;

//choice timer and display timer
const choiceTimer = document.querySelector('input[name=time]:checked').value;
const displayTimer = document.getElementById('timer');

//button play calcul
const buttonPlayCalcul = document.querySelector('.play');
const buttonResetGame = document.querySelector('.reset');

//display question calcul
const displayQuestionCalcul = document.querySelector('.question-calcul');
const responseCalcul = document.querySelector('.input-response');

//variables
let multiplyComputer = 0;
let choiceMultiply = 0;

// choice table multiply
tablesMultiply.forEach((table) => {
  table.addEventListener('click', (e) => {
    let buttonNumber = e.target.id;
    choiceMultiply = buttonNumber;
    if (buttonNumber !== '') {
      blockTableMultiplyRandom.classList.add('boxDisabled');
    }
  });
});

// table multiply random
buttonTableRandom.addEventListener('click', () => {
  multiplyComputer = Math.floor(Math.random() * 14) + 2; // +2 pour éliminer le 0 et 1
  blockTableMultiply.classList.add('boxDisabled');
  tableMultiplyRandom.classList.add('random-active');
  const numberRandom = multiplyComputer;
  textMultiplyRandom.textContent = numberRandom;
});
