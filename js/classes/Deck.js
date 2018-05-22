class Deck {
    static newDeck() {
        var deck = [];
        var suits = ['diamond', 'club', 'heart', 'spade'];
        
        suits.forEach(suit => {
            for(let i = 1; i < 14; i++) {
                deck.push({
                    suit: suit,
                    rank: i
                });
            }
        });

        return Deck.shuffle(deck);
    }

    static draw(deck, num = 1) {
        return deck.splice(0, num);
    }

    static shuffle(deck) {
        var currentIndex = deck.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = deck[currentIndex];
          deck[currentIndex] = deck[randomIndex];
          deck[randomIndex] = temporaryValue;
        }
      
        return deck;
    }
}

export default Deck;