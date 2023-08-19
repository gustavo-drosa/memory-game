

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
        console.log('matches!')
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        firstCard.classList.add('matchedCard');
        secondCard.classList.add('matchedCard');

        console.log(firstCard.classList)
        console.log(secondCard.classList)

    }else{
        console.log('dont match')
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
    console.log('function unflipcards')
}

function shuffleCards(){
    allCards.forEach(cardPosition => {
        let randomNumber = Math.floor(Math.random() * 12)
        cardPosition.style.order = randomNumber;
    });
}
