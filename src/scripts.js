//assim que a pagina termina de carregar aciona o cronometro
window.onload = function () {
  startStopwatch();
};

var score = 0;
const scoreElement = document.getElementById("score-board");

const allCards = document.querySelectorAll(".memory-card");

var securityLockCards = false;
let hasFlippedCard = false;
let firstCard, secondCard;

shuffleCards();

allCards.forEach((selectedCard) =>
  selectedCard.addEventListener("click", flipCard)
);

function flipCard() {
  if (securityLockCards) {
    return;
  }
  if (this === firstCard) {
    return;
  }

  this.classList.add("flip");

  if (!hasFlippedCard) {
    // definindo ordem de virada de carta
    // frist card
    hasFlippedCard = true;
    firstCard = this;
  } else {
    // second card
    secondCard = this;
    hasFlippedCard = false;

    matchesCards(firstCard, secondCard);
  }
}

function matchesCards(firstCard, secondCard) {
  //aqui eu adiciono o score
  if (
    firstCard.getAttribute("data-name") === secondCard.getAttribute("data-name")
  ) {
    score += scoreModifier();
    firstCard.removeEventListener("click", flipCard); //removing the eventlistener from the cards
    secondCard.removeEventListener("click", flipCard);

    firstCard.classList.add("matchedCard");
    secondCard.classList.add("matchedCard");

    checkCardsFlipped(allCards);
  } else {
    securityLockCards = true;

    setTimeout(function () {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");

      unflipCards();
    }, 600);
  }
}

function unflipCards() {
  [hasFlippedCard, securityLockCards] = [false, false];
  [firstCard, secondCard] = [null, null];
  firstCard.classList.remove("matchedCard");
  secondCard.classList.remove("matchedCard");
}

function shuffleCards() {
  allCards.forEach((cardPosition) => {
    let randomNumber = Math.floor(Math.random() * 12);
    cardPosition.style.order = randomNumber;
  });
}

//função pra adicionar o score no scoreboard
function scoreModifier() {
  //formulazinha:
  if (second < 10) {
    newScore = 100 * 1.5;
  } else if (second < 20) {
    newScore = 100 * 1.2;
  } else if (second < 30) {
    newScore = 100 * 1;
  } else {
    newScore = 100 * 0.8;
  }

  updateScoreBoard();
  return newScore;
}

function updateScoreBoard() {
  scoreElement.textContent = `Score: ${score}`;
}
//função para mostrar o score, que organize em ordem descrescente

//stopwatch function
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
function checkCardsFlipped(allCards) {
  for (let index of allCards) {
    if (allCards.index.contains("matchedCard")) {
      gameOver();
    } else {
      return;
    }
  }
}

//stop the stopwatch and send a message
function gameOver() {
  console.log("está aqui");
  clearInterval(stopwatch);
}
