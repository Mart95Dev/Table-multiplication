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
const boxCalcul = document.querySelector('.response');
const buttonValidation = document.querySelector('.validation');

//display score
const scoreFalse = document.getElementById('score-false');
const scoreTrue = document.getElementById('score-true');
const scoreTotal = document.getElementById('score-total');
const smiley = document.getElementById('smiley');

//variables
let totalPoint = 0;
let timerOn = 0;
let resultTabComputer = [];
let resultTab = [];
let timer = 0;
let startingSeconds = 0;
let audio1 = '';
let audio2 = '';
let audioMinuterie = new Audio('Audio/minuteur.mp3');
let audioAlert = new Audio('Audio/reveil2.mp3');

let multiplyComputer = 0;
let choiceMultiply = 0;
let templateQuestion = '';
// variable values time and operation
let numberOperation = 0;
let choiceSeconds = 0;
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
    numberOperation = Number(e.target.value);
    operation.setAttribute('checked', '');
    inputOperationValue = 1;
  });
});

//choice timer
choiceTimes.forEach((time) => {
  time.addEventListener('click', (e) => {
    choiceSeconds = e.target.value;
    time.setAttribute('checked', '');
    inputTimeValue = 1;
  });
});

// button play game
buttonPlayCalcul.addEventListener('click', () => {
  // verifie si tous les critères ont été choisis si non on alerte pour commencer le jeu
  checkchoices();
  buttonResetGame.classList.add('buttons-off');
});

//button reset
buttonResetGame.addEventListener('click', reset);

//button validation responses
buttonValidation.addEventListener('click', () => {
  timerOn = 0;
  clearCounter();
  validation();
});

//function reset and table disabled
function reset() {
  blockTableMultiply.classList.remove('boxDisabled');
  blockTableMultiplyRandom.classList.remove('boxDisabled');
  tableMultiplyRandom.classList.remove('multiply-random-active');
  displayTimer.classList.remove('start-timer-active');
  buttonValidation.classList.remove('validation-active');
  boxRandom.classList.remove('random-active');
  buttonPlayCalcul.classList.remove('play-active');
  boxCalcul.classList.remove('boxDisabled');
  smiley.setAttribute('src', '');
  smiley.classList.remove('emoji-active');
  timerOn = 0;
  resultTab = [];
  resultTabComputer = [];
  multiplyComputer = 0;
  choiceMultiply = 0;
  numberOperation = 0;
  inputOperationValue = 0;
  inputTimeValue = 0;
  tQuestion = '';
  scoreTotal.textContent = '0%';
  scoreTrue.textContent = 0;
  scoreFalse.textContent = 0;
  clearHtmlQuestion();
  clearCounter();
  clearAudio();

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
    return;
  } else if (inputOperationValue === 0 && inputTimeValue === 0) {
    alert(
      "Vous avez oublié de choisir le nombre d'opération et le temps pour la révision"
    );
    return;
  } else if (inputOperationValue === 0) {
    alert("Choisissez le nombre d'opérations à répondre");
    return;
  } else if (inputTimeValue === 0) {
    alert('Choisissez le temps de réponse pour la révision');
    return;
  }
  screenTimer();
}

function screenTimer() {
  displayTimer.classList.add('start-timer-active');
  displayTimer.textContent = `${choiceSeconds} secondes`;
  question();
  countdown();
}

// display calcul
function question() {
  // create number operations in box response
  let i = 0;
  while (i < numberOperation) {
    //create template multiply questions
    templateQuestion = `
    <p class="calcul">
    <span class="question-calcul"></span>
    <input type="text" size="3" minlength="1" maxlength="3" class="input-response result-calcul result-index">
    </p>
    `;
    boxCalcul.insertAdjacentHTML('afterbegin', templateQuestion); // insert le template avant toutes les balises p
    const displayQuestionCalcul = document.querySelector('.question-calcul');

    // display operation and random number
    ///////////////////////////////////////////// code récupérer
    function randomArray(i, min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);

      let arr = Array.from(
        { length: i },
        () => Math.floor(Math.random() * (max - min)) + min
      );

      return arr.sort();
    }

    let uniqueItems = [...new Set(randomArray(1, 1, 10))];
    ///////////////////////////////////////////////////////////
    // let qCalcul = Math.floor(Math.random() * 11) + 1;
    if (multiplyComputer > 0) {
      displayQuestionCalcul.textContent = `${multiplyComputer} x ${uniqueItems} = `;
      resultTabComputer.push(multiplyComputer * uniqueItems);
    } else {
      displayQuestionCalcul.textContent = `${choiceMultiply} x ${uniqueItems} = `;
      resultTabComputer.push(choiceMultiply * uniqueItems);
    }

    console.log('resultat computer : ' + resultTabComputer);
    i++;
    /// fin boucle while
  }
  resultTabComputer.reverse();

  buttonValidation.classList.add('validation-active');
  buttonPlayCalcul.classList.add('play-active');

  // fin function question
}

// clear balise HTML on box response then click reset // code récupérer mais compris
function clearHtmlQuestion() {
  const element = document.getElementById('html');
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

// function timer
const countdown = () => {
  startingSeconds = choiceSeconds;
  timer = setInterval(counter, 1000);

  // function interval timer
  function counter() {
    startingSeconds =
      startingSeconds < 10 ? `0${startingSeconds}` : startingSeconds;
    displayTimer.textContent = `${startingSeconds} secondes `;

    if (startingSeconds > 0) {
      timerOn = 1;
      responses();
      startingSeconds--;
      audio1 = setTimeout(() => {
        audioMinuterie.play();
      }, 0);
    } else {
      timerOn = 0;
      audioMinuterie.pause();
      audioMinuterie.currentTime = 0;
      audio2 = setTimeout(() => {
        audioAlert.play();
      }, 0);
      setTimeout(() => {
        audioAlert.pause();
        audioAlert.currentTime = 0;
      }, 1000);

      displayTimer.textContent = 'le temps est écoulé';
      displayTimer.style.color = 'orange';
      timerOn = 0;
      clearCounter();
      responses();
      return;
    }
  }
};

// Reset sur le timer et les audios
function clearCounter() {
  choiceSecond = 0;
  startingSeconds = 0;
  clearInterval(timer);
}

function clearAudio() {
  clearTimeout(audio1);
  clearTimeout(audio2);
}

// Ecoute responses
const responses = () => {
  if (timerOn === 1) {
    inputsResult = document.querySelectorAll('.result-calcul');
    inputsResult.forEach((input) => {
      input.addEventListener('input', (e) => {
        let resultInput = parseInt(e.target.value);
        resultTab.push(resultInput);
      });
    });
  } else if (timerOn === 0) {
    inputsResult.forEach((resp) => {
      if (resp.value == '') {
        resultTab.push(0);
        resp.value = '0';
      }
    });
    boxCalcul.classList.add('boxDisabled');
    buttonValidation.classList.add('buttons-off');
    validation();
    return;
  }
};

//validation responses by button or timer off
function validation() {
  // resultTabComputer = les réponses ordinateur
  // resultTab = les réponses des enfants
  let goodPoint = 0;
  let wrongPoint = 0;
  const tabComputer = [...resultTabComputer];
  const tabResponse = [...resultTab];
  for (i = 0; i < tabComputer.length; i++) {
    if (tabResponse.includes(tabComputer[i])) {
      goodPoint++;
      scoreTrue.textContent = goodPoint;
    } else {
      wrongPoint++;
      scoreFalse.textContent = wrongPoint;
    }
    totalPoint = parseInt((goodPoint / numberOperation) * 100);
    scoreTotal.textContent = `${totalPoint}%`;
    emoji();
  }
  return;
}

// smileys percent score
function emoji() {
  if (totalPoint === 0) {
    const audioNull = new Audio('Audio/null.mp3');
    setTimeout(() => {
      smiley.classList.add('emoji-active');
      smiley.setAttribute('src', 'svg/en-colere.svg');
      audioNull.play();
    }, 1000);
    return;
  } else if (totalPoint === 100) {
    const audioBravo = new Audio('Audio/bravo.mp3');
    setTimeout(() => {
      smiley.classList.add('emoji-active');
      smiley.setAttribute('src', 'svg/heureux.svg');
      audioBravo.play();
    }, 1000);
    return;
  } else if (totalPoint > 0 && totalPoint <= 20) {
    smiley.classList.add('emoji-active');
    smiley.setAttribute('src', 'svg/pleurs2.svg');
    return;
  } else if (totalPoint > 20 && totalPoint <= 40) {
    smiley.classList.add('emoji-active');
    smiley.setAttribute('src', 'svg/malheureux.svg');
    return;
  } else if (totalPoint > 40 && totalPoint <= 60) {
    smiley.classList.add('emoji-active');
    smiley.setAttribute('src', 'svg/pleurs.svg');
    return;
  } else if (totalPoint > 60 && totalPoint <= 80) {
    smiley.classList.add('emoji-active');
    smiley.setAttribute('src', 'svg/silencieux.svg');
    return;
  } else {
    smiley.classList.add('emoji-active');
    smiley.setAttribute('src', 'svg/heureux.svg');
    return;
  }
}

// // affiche fenetre overlay qui résume le tout
// function endGame() {
//   ////
// }
