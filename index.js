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

//button popup visible and close popup
const overlay = document.querySelector('.overlay');
const btnOverlay = document.getElementById('btn-overlay');
const resume = document.querySelector('.resume'); /// recupère la class ul

//variables
let totalPoint = 0;
let timerOn = 0;
let resultTabComputer = [];
let resultTab = [];
let tab = [];
let timer = 0;
let startingSeconds = 0;
let audio1 = '';
let audio2 = '';
let audioMinuterie = new Audio('Audio/minuteur.mp3');
let audioAlert = new Audio('Audio/reveil2.mp3');
let multiplyComputer = 0;
let choiceMultiply = 0;
// variable values time and operation
let numberOperation = 0;
let choiceSeconds = 0;
// //variable input radio not checked
let inputOperationValue = 0;
let inputTimeValue = 0;

///////////////////////////////////////////////////////////////////
// choices parameters by child
////////////////////////////////////////////////////////////////////
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

/////////////////////////////////////////////////////////////
/// buttons reset, play and validation
////////////////////////////////////////////////////////////

// button play game
buttonPlayCalcul.addEventListener('click', () => {
  checkchoices();
  // buttonResetGame.classList.add('buttons-off');
});

//button reset
buttonResetGame.addEventListener('click', reset);

//button validation responses
buttonValidation.addEventListener('click', () => {
  audioMinuterie.pause();
  audioMinuterie.currentTime = 0;
  timerOn = 0;
  responses();
  clearAudio();
  clearCounter();
  validation();
});

//button overlay off and reset game
btnOverlay.addEventListener('click', () => {
  overlay.classList.remove('overlay-active');
  reset();
});

///////////////////////////////////////////////////////////////////////
//functions called
/////////////////////////////////////////////////////////////////////

//function reset
function reset() {
  buttonResetGame.classList.remove('buttons-off');
  buttonValidation.classList.remove('buttons-off');
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
  resume.innerHTML = '';
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

//function box-disabled - table disabled
const tableDisabled = () => {
  if (choiceMultiply > 0) {
    blockTableMultiplyRandom.classList.add('boxDisabled');
  } else if (multiplyComputer > 0) {
    blockTableMultiply.classList.add('boxDisabled');
    // tableMultiplyRandom.classList.add('multiply-random-active');
    return;
  }
};

//function check choices
const checkchoices = () => {
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
  buttonPlayCalcul.classList.add('play-active');
  buttonValidation.classList.add('validation-active');
  screenTimer();
};

//function display timer
const screenTimer = () => {
  displayTimer.classList.add('start-timer-active');
  displayTimer.textContent = `${choiceSeconds} secondes`;
  question();
  countdown();
};

// function number random
const randomNumber = (max) => {
  let nbr = Math.floor(Math.random() * max) + 1;

  if (tab.includes(nbr)) randomNumber(max);
  else return nbr;
};

// function display calcul - create numbers operations in box response
const question = () => {
  tab = [];

  for (i = 0; i < numberOperation; i++) {
    const v = randomNumber(10);
    if (v === undefined) i--;
    else tab.push(v);
  }

  tab.forEach((value) => {
    //create template multiply questions
    let templateQuestion = `
   <p class="calcul">
   <span class="question-calcul"></span>
   <input type="text" size="3" minlength="1" maxlength="3" class="input-response result-calcul result-index">
   </p>
   `;
    boxCalcul.insertAdjacentHTML('afterbegin', templateQuestion); // insert le template avant toutes les balises p

    const displayQuestionCalcul = document.querySelector('.question-calcul');
    const multiply = multiplyComputer || choiceMultiply; // falsy

    displayQuestionCalcul.textContent = `${multiply} x ${value} = `;
    resultTabComputer.push(multiply * value);
  });
};

// function clear balise HTML on box response then click reset // code récupérer mais compris
const clearHtmlQuestion = () => {
  const element = document.getElementById('html');
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

// function timer
const countdown = () => {
  startingSeconds = choiceSeconds;
  timer = setInterval(counter, 1000);

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

// function reset timer
const clearCounter = () => {
  choiceSecond = 0;
  startingSeconds = 0;
  clearInterval(timer);
};

// function reset musics
const clearAudio = () => {
  clearTimeout(audio1);
  clearTimeout(audio2);
};

// function responses
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
    validation();
    return;
  }
};

//function validation responses by button or timer off
const validation = () => {
  let goodPoint = 0;
  let wrongPoint = 0;
  const tabComputer = [...resultTabComputer];
  const tabResponse = [...resultTab];
  for (i = 0; i < resultTabComputer.length; i++) {
    if (tabResponse.includes(resultTabComputer[i])) {
      goodPoint++;
      scoreTrue.textContent = goodPoint;
    } else {
      wrongPoint++;
      scoreFalse.textContent = wrongPoint;
    }
    totalPoint = Math.round((goodPoint / numberOperation) * 100);
    scoreTotal.textContent = `${totalPoint}%`;
  }
  buttonValidation.classList.add('buttons-off');
  emoji();
  endGame();
  return;
};

// function smileys percent score
const emoji = () => {
  if (totalPoint === 0) {
    const audioNull = new Audio('Audio/null.mp3');
    setTimeout(() => {
      smiley.classList.add('emoji-active');
      smiley.setAttribute('src', 'svg/en-colere.svg');
      audioNull.play();
    }, 1000);
    return;
  }

  if (totalPoint === 100) {
    const audioBravo = new Audio('Audio/bravo.mp3');
    setTimeout(() => {
      smiley.classList.add('emoji-active');
      smiley.setAttribute('src', 'svg/heureux.svg');
      audioBravo.play();
    }, 1000);
    return;
  }

  if (totalPoint >= 1 && totalPoint <= 20) {
    smiley.classList.add('emoji-active');
    smiley.setAttribute('src', 'svg/pleurs2.svg');
    return;
  } else if (totalPoint > 20 && totalPoint <= 40) {
    smiley.classList.add('emoji-active');
    smiley.setAttribute('src', 'svg/pleurs.svg');
    return;
  } else if (totalPoint > 40 && totalPoint <= 60) {
    smiley.classList.add('emoji-active');
    smiley.setAttribute('src', 'svg/malheureux.svg');
    return;
  } else if (totalPoint > 60 && totalPoint <= 79) {
    smiley.classList.add('emoji-active');
    smiley.setAttribute('src', 'svg/sourire.svg');
    return;
  } else if (totalPoint >= 80) {
    smiley.classList.add('emoji-active');
    smiley.setAttribute('src', 'svg/heureux2.svg');
    return;
  }
};

//function check responses calcul
const checkResponses = () => {
  ///////// code récuperer  ///// Filtre les réponses pour eliminer les nombres recurrents sur l'input
  const filteredTabResult = resultTab.filter(
    (ele, pos) => resultTab.indexOf(ele) == pos
  );
  let seconds;
  let timeOut;

  if (displayTimer.textContent == 'le temps est écoulé') {
    seconds = choiceSeconds;
  } else {
    timeOut = displayTimer.textContent.slice(0, 2);
    seconds = choiceSeconds - Number(timeOut);
  }

  const textOverlay = document.querySelector('.text-overlay');
  const multiplyTable = multiplyComputer || choiceMultiply; // falsy

  textOverlay.innerHTML = `<h3> VOICI LE R&Eacute;SUM&Eacute DE TES R&Eacute;PONSES</h3>
  <p> tu as choisis de réviser la table de <span class='variables'>${multiplyTable}</span>, avec un nombre de <span class='variables'>${numberOperation}</span> opération(s) sur un temps de <span class='variables'>${choiceSeconds}</span> secondes.</p>
  <img class="separate-orange" src="image/png/separate-orange.png"  alt="ligne séparatrice orange">
  <p> Tu as répondu à toutes les opérations en <span class='variables'>${seconds}</span> secondes</p>
  <img class="separate-orange" src="image/png/separate-orange.png"  alt="ligne séparatrice orange">
  <p> Voici les réponses aux calculs demandés :</p>
  `;

  /////reponses computer = array resultTabComputer
  ////reponses child = array resultTab
  resume.innerHTML = resultTabComputer
    .map((result) => {
      let nbr = result / multiplyTable;

      if (resultTab.includes(result)) {
        return `<span class="result-overlay">
        <li class='resumeCalcul'> ${multiplyTable} x ${nbr} = ${result}</li>  
        <p>Bonne réponse</p>      
        <img class="icone" src="image/png/good.png"  alt="bonne réponse">
       
        </span>`;
      } else {
        return `<span class="result-overlay">
        <li class='resumeCalcul'> ${multiplyTable} x ${nbr} = ${result}</li>   
        <p>Mauvaise réponse</p>    
        <img class="icone" src="svg/wrong.svg"  alt="Mauvaise réponse">     
        </span>`;
      }
    })
    .join('');

  resume.insertAdjacentHTML('beforeend', '<br>');
};

// function popup end game
const endGame = () => {
  overlay.classList.add('overlay-active');
  checkResponses();
  return;
};
