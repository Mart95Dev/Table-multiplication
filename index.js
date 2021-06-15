// button disabled : boxDisabled
const blockTableMultiplyRandom = document.querySelector('.position-random');
const blockTableMultiply = document.querySelector('.number');

// choice table multiply
const tablesMultiply = document.querySelectorAll('input[name="multiply"]');

// choice table multiply random
const boxRandom = document.querySelector('.random');
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
let audioMinuterie = new Audio('Audio/minuteur.mp3');
let audioAlert = new Audio('Audio/reveil.mp3');
let multiplyComputer = 0;
let choiceMultiply = 0;
// variable values time and operation
let numberOperation = 0;
let ChoiceSeconds = 0;
// //variable input radio not checked
let inputOperationValue = 0;
let inputTimeValue = 0;

// choice table multiply
tablesMultiply.forEach((table) => {
  table.addEventListener('click', (e) => {
    choiceMultiply = e.target.id;
    table.setAttribute('checked', '');
    tableDisabled();
  });
});

// choice table multiply random
buttonTableRandom.addEventListener('click', () => {
  multiplyComputer = Math.floor(Math.random() * 14) + 2; // +2 pour éliminer le 0 et 1
  boxRandom.classList.add('random-active');
  tableMultiplyRandom.classList.add('multiply-random-active');
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
    choiceSeconds = e.target.id;
    time.setAttribute('checked', '');
    inputTimeValue = 1;
  });
});

// button play game
buttonPlayCalcul.addEventListener('click', () => {
  // verifie si tous les critères ont été choisis si non on alerte pour commencer le jeu
  // affiche le temps choisis et affiche les calculs si checkchoices est bon.
  checkchoices();

  //fin chrono popup s'affiche avec le résumé des opérations + symbol pour indquer bon et mauvais
  // affiche le score bonne réponses et mauvaises réponses
});

//button reset
buttonResetGame.addEventListener('click', reset);

//function reset and table disabled
function reset() {
  blockTableMultiply.classList.remove('boxDisabled');
  blockTableMultiplyRandom.classList.remove('boxDisabled');
  tableMultiplyRandom.classList.remove('multiply-random-active');
  displayTimer.classList.remove('start-timer-active');
  displayQuestionCalcul.classList.remove('question-active');
  dispplayInputResponse.classList.remove('input-response-active');
  boxRandom.classList.remove('random-active');
  multiplyComputer = 0;
  choiceMultiply = 0;
  numberOperation = 0;
  second = 0;
  inputOperationValue = 0;
  inputTimeValue = 0;

  audioMinuterie = new Audio('Audio/minuteur.mp3');
  audioAlert = new Audio('Audio/reveil.mp3');

  //variable input radio operation
  inputOperation = document.querySelector('input[name="operation"]:checked');
  // variable input radio time
  inputTime = document.querySelector('input[name="time"]:checked');
  // variable input radio multiply
  inputMultiply = document.querySelector('input[name="multiply"]:checked');

  //boucle sur tabInput pour rechercher les radio checked pour les dé-checked
  const tabInput = [inputMultiply, inputOperation, inputTime];
  for (let i = 0; i < tabInput.length; i++) {
    if (tabInput[i]) {
      tabInput[i].checked = false;
    }
  }
  return;
}

//box-disabled
function tableDisabled() {
  if (choiceMultiply > 0) {
    blockTableMultiplyRandom.classList.add('boxDisabled');
  } else if (multiplyComputer > 0) {
    blockTableMultiply.classList.add('boxDisabled');
    // tableMultiplyRandom.classList.add('multiply-random-active');
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
  } else {
    screenTimer();
  }
}

function screenTimer() {
  displayTimer.classList.add('start-timer-active');
  displayTimer.textContent = `${choiceSeconds} secondes`;
  question();
  countdown();
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
  // countdown();
}

// function timer
const countdown = () => {
  let startingSeconds = choiceSeconds;

  setInterval(counter, 1000);

  function counter() {
    startingSeconds =
      startingSeconds < 10 ? `0${startingSeconds}` : startingSeconds;
    displayTimer.textContent = `${startingSeconds} secondes `;

    if (startingSeconds > 0) {
      audioMinuterie.play();
      startingSeconds--;
    } else {
      audioMinuterie.pause();
      audioMinuterie.currentTime = 0;
      audioAlert.play();
      setTimeout(() => {
        audioAlert.pause();
        audioAlert.currentTime = 0;
      }, 2000);
      clearTimeout();
      displayTimer.textContent = 'le temps est écoulé';
      displayTimer.style.color = 'orange';
    }
  }
};
