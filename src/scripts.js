//assim que a pagina termina de carregar aciona o cronometro
window.onload = function () {
    startStopwatch()
}

var score = 0;
const scoreElement = document.getElementById("score-board");


const allCards = document.querySelectorAll(".memory-card"); 


var securityLockCards = false; 
let hasFlippedCard = false;
let firstCard, secondCard;

shuffleCards();

allCards.forEach(selectedCard => selectedCard.addEventListener('click', flipCard))

function flipCard(){
    if (securityLockCards){
        return;
    }

    if(this === firstCard){
        return;
    }

    this.classList.add('flip');

    if(!hasFlippedCard){
        // first click
        hasFlippedCard = true;
        firstCard = this;
    }else{
        // second click
        secondCard = this;
        hasFlippedCard = false;

        matchesCards(firstCard, secondCard);
    }
}


function matchesCards(firstCard, secondCard){
    if(firstCard.getAttribute('data-name') === secondCard.getAttribute('data-name')){
        //aqui eu adiciono o score
        score += scoreModifier();
        firstCard.removeEventListener('click', flipCard); //removing the eventlistener from the cards
        secondCard.removeEventListener('click', flipCard);

        firstCard.classList.add('matchedCard');
        secondCard.classList.add('matchedCard');

        checkCardsFlipped()

    }else{
        securityLockCards = true;

        setTimeout(function(){
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');

        unflipCards();
        }, 600);
    }
    
}

function unflipCards(){
    [hasFlippedCard, securityLockCards] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function shuffleCards(){
    allCards.forEach(cardPosition => {
        let randomNumber = Math.floor(Math.random() * 12)
        cardPosition.style.order = randomNumber;
    });
}

//função pra adicionar o score no scoreboard
function scoreModifier(){
        //formulazinha:
    if(second < 10){
        newScore = 100 * 1.5;
    }else if(second < 20){
        newScore = 100 * 1.2;
    }else if(second < 30){
        newScore = 100 * 1
    }else{
        newScore = 100 * 0.8 
    }

    updateScoreBoard();
    return newScore;
}

function updateScoreBoard(){
    scoreElement.textContent = `Score: ${score}`
}
//função para mostrar o score, que organize em ordem descrescente

//stopwatch function
let millisecond = 0;
let second = 0;
let stopwatch;

function startStopwatch() {
    clearInterval(stopwatch)
    stopwatch = setInterval(() => {timer(); },10)
}

function timer(){
    if((millisecond += 10) == 1000){
        millisecond = 0;
        second++;
    }
    document.getElementById('second').innerText = `${second}`
}

//verifica se todas as cartas estão flipadas
function checkCardsFlipped(){
    for(let index of allCards){
        if (!index.classList.contains("matchedCard")){
            console.log('nem todas as cartas estão combinadas')
            return false;    
        }
        console.log('todas as cartas combinadas')
        return true;
    }
}