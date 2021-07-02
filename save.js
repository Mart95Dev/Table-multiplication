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
    templateQuestion = `
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
