let game = {
    lockMode: false,
    firstCard: null,
    secondCard: null,

    setCard: function(id) {
        let card = this.cards.filter(card => card.id === id)[0];

        if (card.flipped || this.lockMode) return false;

        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else {
            this.secondCard = card;
            this.lockMode = true;
            this.secondCard.flipped = true;
            return true;
        }

    },

    unflipCards: function() {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    checkMatch: function() {
        if (!this.firstCard || !this.secondCard) {
            return false;
        }
        return this.firstCard.icon === this.secondCard.icon;
    },

    clearCards: function() {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    checkGameOver: function() {
        return this.cards.filter(card => !card.flipped).length == 0;
    },

    pokemons: ['pikachu',
        'bullbasaur',
        'charmander',
        'eevee',
        'jigglypuff',
        'psyduck',
        'meowth',
        'zubat',
        'snorlax',
        'squirtle'
    ],
    cards: null,

    createPokeCards: function() {
        this.cards = [];

        for (let poke of this.pokemons) {
            this.cards.push(this.createPairFromPoke(poke));
        }

        this.cards = this.cards.flatMap(pair => pair);
        this.shuffleCards();
        return this.cards
    },

    createPairFromPoke: function(poke) {
        return [{
            id: this.createID(poke),
            icon: poke,
            flipped: false
        }, {
            id: this.createID(poke),
            icon: poke,
            flipped: false
        }]
    },

    createID: function(poke) {
        return poke + parseInt(Math.random() * 1000);
    },

    shuffleCards: function(cards) {
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
        }

    }


}