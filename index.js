// button disabled : boxDisabled
const blockTableMultiplyRandom = document.querySelector('.position-random');
const blockTableMultiply = document.querySelector('.number');

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
const dispplayInputResponse = document.querySelector('.input-response');
const responseCalcul = document.getElementById('response');

//variables
let multiplyComputer = 0;
let choiceMultiply = 0;
// variable values time and operation
let numberOperation = 0;
let seconds = 0;
//variable input box not checked
let inputOperationValue = 0;
let inputTimeValue = 0;

// choice table multiply
tablesMultiply.forEach((table) => {
  table.addEventListener('click', (e) => {
    /// modifier le code pour activer le focus avec le style css et désactiver en fonction du choix
    // voir l'exemple tout en bas du li avec before
    const buttonNumber = e.target.id;
    choiceMultiply = buttonNumber;
    tableDisabled();
  });

  let keyButton = buttonNumber;
  console.log(keyButton);
});

// choice table multiply random
buttonTableRandom.addEventListener('click', () => {
  multiplyComputer = Math.floor(Math.random() * 14) + 2; // +2 pour éliminer le 0 et 1
  textMultiplyRandom.textContent = multiplyComputer;
  tableDisabled();
});

// choice operation number
choiceOperations.forEach((operation) => {
  operation.addEventListener('click', (e) => {
    numberOperation = e.target.id;
    operation.setAttribute('checked', '');
    inputOperationValue = 1;
  });
});

//choice timer
choiceTimes.forEach((time) => {
  time.addEventListener('click', (e) => {
    seconds = e.target.id;
    time.setAttribute('checked', '');
    inputTimeValue = 1;
  });
});

// button play game
buttonPlayCalcul.addEventListener('click', () => {
  // verifie si tous les critères ont été choisis si non on alerte
  checkchoices();
  // affiche le temps choisis
  timer();
  // affiche les calculs à répondre en fonction du nombre operations choisis pour la révision
  question();
  // affiche le score bonne réponses et mauvaises réponses
  //fin chrono popup s'affiche avec le résumé des opérations + symbol pour indquer bon et mauvais
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
    return;
  }
}

//function reset and table disabled
function reset() {
  blockTableMultiply.classList.remove('boxDisabled');
  blockTableMultiplyRandom.classList.remove('boxDisabled');
  tableMultiplyRandom.classList.remove('random-active');
  displayTimer.classList.remove('start-timer-active');
  displayQuestionCalcul.classList.remove('question-active');
  dispplayInputResponse.classList.remove('input-response-active');
  multiplyComputer = 0;
  choiceMultiply = 0;
  numberOperation = 0;
  second = 0;
  inputOperationValue = 0;
  inputTimeValue = 0;
  //variable input box operation
  inputOperation = document.querySelector('input[name="operation"]:checked');
  // variable input box time
  inputTime = document.querySelector('input[name="time"]:checked');

  if (inputOperation && inputTime) {
    inputTime.checked = false;
    inputOperation.checked = false;
  } else if (inputOperation) {
    inputOperation.checked = false;
  } else if (inputTime) {
    inputTime.checked = false;
  } else {
    return;
  }
}

function checkchoices() {
  if (choiceMultiply === 0 && multiplyComputer === 0) {
    alert('Choissisez la table de révision !');
  } else if (inputOperationValue === 0 && inputTimeValue === 0) {
    alert(
      "Vous avez oublié de choisir le nombre d'opération et le temps pour la révision"
    );
  } else if (inputOperationValue === 0) {
    alert("Choisissez le nombre d'opérations à répondre");
  } else if (inputTimeValue === 0) {
    alert('Choisissez le temps de réponse pour la révision');
  }
  return;
}

function timer() {
  displayTimer.classList.add('start-timer-active');
  displayTimer.textContent = `${seconds} secondes`;
}

function question() {
  let qCalcul = Math.floor(Math.random() * 11);
  displayQuestionCalcul.classList.add('question-active');
  dispplayInputResponse.classList.add('input-response-active');
  if (multiplyComputer > 0) {
    displayQuestionCalcul.textContent = `${multiplyComputer} x ${qCalcul} = `;
  } else {
    displayQuestionCalcul.textContent = `${choiceMultiply} x ${qCalcul} = `;
  }
  return;
}

//// idée pour faire le focus sur btn number

// li {
//   list-style-type: none;
//   position: relative;
//   margin: 1px;
//   padding: 0.5em 0.5em 0.5em 2em;
//   background: lightgrey;
//   font-family: sans-serif;
// }

// li.done {
//   background: #CCFF99;
// }

// li.done::before {
//   content: '';
//   position: absolute;
//   border-color: #009933;
//   border-style: solid;
//   border-width: 0 0.3em 0.25em 0;
//   height: 1em;
//   top: 1.3em;
//   left: 0.6em;
//   margin-top: -1em;
//   transform: rotate(45deg);
//   width: 0.5em;
// }
