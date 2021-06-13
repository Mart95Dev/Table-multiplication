// button disabled : boxDisabled
const blockTableMultiplyRandom = document.querySelector('.position-random');
const blockTableMultiply = document.querySelector('fieldset');

// choice table multiply

const tablesMultiply = document.querySelectorAll('.btn-number');

// choice table multiply random
const buttonTableRandom = document.querySelector('.table-number-random');
const tableMultiplyRandom = document.querySelector('.multiply-random');
const textMultiplyRandom = document.getElementById('text-multiply-random');

//choice number operation
const choiceOperations = document.querySelectorAll('input[name="operation"]');

//choice timer and display timer
const choiceTimes = document.querySelectorAll('input[name="time"]');
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
let numberOperation = 0;
let second = 0;

// choice table multiply
tablesMultiply.forEach((table) => {
  table.addEventListener('click', (e) => {
    const buttonNumber = e.target.id;
    choiceMultiply = buttonNumber;
    tableDisabled();
  });
});

// choice table multiply random
buttonTableRandom.addEventListener('click', () => {
  multiplyComputer = Math.floor(Math.random() * 14) + 2; // +2 pour éliminer le 0 et 1
  tableDisabled();
  const numberRandom = multiplyComputer;
  textMultiplyRandom.textContent = numberRandom;
});

// choice operation number
choiceOperations.forEach((operation) => {
  operation.addEventListener('click', (e) => {
    numberOperation = e.target.id;
    operation.setAttribute('checked', '');
  });
});

//choice timer
choiceTimes.forEach((time) => {
  time.addEventListener('click', (e) => {
    second = e.target.id;
    time.setAttribute('checked', '');
  });
});

//button reset
buttonResetGame.addEventListener('click', reset);

//box-disabled
function tableDisabled() {
  if (choiceMultiply > 0) {
    blockTableMultiplyRandom.classList.add('boxDisabled');
  } else if (multiplyComputer > 0) {
    blockTableMultiply.classList.add('boxDisabled');
    tableMultiplyRandom.classList.add('random-active');
  } else {
    return;
  }
}

//function reset table disabled
function reset() {
  document.querySelector('input[name="operation"]:checked').checked = false;
  document.querySelector('input[name="time"]:checked').checked = false;
  blockTableMultiply.classList.remove('boxDisabled');
  blockTableMultiplyRandom.classList.remove('boxDisabled');
  return;
}
