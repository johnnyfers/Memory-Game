const FRONT = 'card-front';
const BACK = 'card-back';
const CARD = 'card';
const ICON = 'icon';


start();

function start() {
    initializeCards(game.createPokeCards());
}

function initializeCards(cards) {
    let gameBoard = document.getElementById('gameboard');
    gameBoard.innerHTML = '';

    game.cards.forEach(card => {
        let cardElement = document.createElement('div');

        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement);

        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });

}

function createCardContent(card, cardElement) {
    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);
}


function createCardFace(face, card, element) {

    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);

    if (face === FRONT) {
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = '../assets/' + card.icon + '.png';
        cardElementFace.appendChild(iconElement);
    } else {
        let iconElement2 = document.createElement('img');
        iconElement2.src = '../assets/pokeball.png';
        cardElementFace.appendChild(iconElement2);

    }
    element.appendChild(cardElementFace);

}



function flipCard() {

    if (game.setCard(this.id)) {
        this.classList.add('flip');
        if (game.secondCard) {
            if (game.checkMatch()) {
                game.clearCards();
                if (game.checkGameOver()) {
                    let gameOverLayer = document.getElementById('gameOver');
                    gameOverLayer.style.display = 'flex';
                }
            } else {

                let firstCardView = document.getElementById(game.firstCard.id);
                let secondCardView = document.getElementById(game.secondCard.id);

                firstCardView.classList.remove('flip');
                secondCardView.classList.remove('flip');
                game.unflipCards();
            };
        }
    }


}

function restart() {
    let gameOverLayer = document.getElementById('gameOver');
    gameOverLayer.style.display = 'none';

    game.clearCards();
    start();
}