//assim que a pagina termina de carregar aciona o cronometro
//e aleatoriza a ordem do grid
window.onload = function () {
  startStopwatch();
  shuffleCards();
};

let blockFlip = false; //não deixar o user virar outra carta

let score = 0;

const scoreElement = document.getElementById("score-board");

const allCards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false; //verifica se a carta ja foi virada
let firstCard, secondCard;

allCards.forEach((selectedCard) =>
  selectedCard.addEventListener("click", flipCard)
);

function flipCard() {
  if(blockFlip){
    return;
  }

  if (this === firstCard) {
    return;
  }

  this.classList.add("flip");

  if (!hasFlippedCard) {
    // definindo ordem de virada de carta
    // first card
    hasFlippedCard = true;
    firstCard = this;
  } else {
    // second card
    secondCard = this;
    hasFlippedCard = false;
    blockFlip = true;

    matchesCards(firstCard, secondCard);
  }
}

function matchesCards(firstCard, secondCard) {
  blockFlip = true;

  if (firstCard.querySelector(".front-face").alt === 
  secondCard.querySelector(".front-face").alt) {

    score = scoreModifier(score);
    firstCard.removeEventListener("click", flipCard); //removing the eventlistener from the cards
    secondCard.removeEventListener("click", flipCard);

    firstCard.classList.add("matchedCard");
    secondCard.classList.add("matchedCard");
  blockFlip = false;

  } else {
    setTimeout(function () {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");

      unflipCards();
    }, 600);
  }
  checkCardsFlipped(allCards);
}


function unflipCards() {
  blockFlip = false;
  firstCard = null;
  secondCard = null;
  //resetando a ordem das cartas
  firstCard.classList.remove("matchedCard");
  secondCard.classList.remove("matchedCard");
}

function shuffleCards() {
  allCards.forEach((cardPosition) => {
    let randomNumber = Math.floor(Math.random() * 12);
    //definindo ordem aleatoria no grid
    cardPosition.style.order = randomNumber;
  });
}

//função pra adicionar o score no scoreboard
function scoreModifier(score) {
  //formulazinha:
  let newScore = 0;
  if (second < 10) {
    newScore = 100 * 1.5;
  } else if (second < 20) {
    newScore = 100 * 1.2;
  } else if (second < 30) {
    newScore = 100 * 1;
  } else {
    newScore = 100 * 0.8;
  }
  score += newScore;

  updateScoreBoard(score);

  return score;
}

function updateScoreBoard(score) {
  scoreElement.textContent = `Score: ${score}`;
}

//função cronometro
let second = 0;
let stopwatch;
const timerElement = document.querySelector(".second");

function startStopwatch() {
  clearInterval(stopwatch);
  stopwatch = setInterval(() => {
    second++;
    document.getElementById("second").textContent = formatTimer(second);
  }, 1000);
}

function formatTimer(time) {
  return time < 10 ? `0${time}` : `${time}`;
}

//verifica se todas as cartas estão flipadas
//se true = chama função gameover
function checkCardsFlipped(allCards) {
  blockFlip = false;
  let classListArray = Array.from(allCards);
  console.log(classListArray)

  if (classListArray.every((div) => div.classList.contains("matchedCard"))) {
    gameOver();
  }
}

//chamada quando todas as cartas tiverem a class "matchedCard" acima
function gameOver(){
  setTimeout(function() {
    alert("GameOver")
    clearInterval(stopwatch);
  }, 200);
}
