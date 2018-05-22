'use strict';

class HandValuator {
    static scoreHand(hand) {
        if(this.isRoyalStraightFlush(hand)) return 'royal straight flush';
        if(this.isStraightFlush(hand)) return 'straight flush';
        if(this.isFourOfaKind(hand)) return 'four of a kind';
        if(this.isFullHouse(hand)) return 'full house';
        if(this.isFlush(hand)) return 'flush';
        if(this.isStraight(hand)) return 'straight';
        if(this.isThreeOfaKind(hand)) return 'three of a kind';
        if(this.isTwoPair(hand)) return 'two pair';
        if(this.isOnePair(hand)) return 'one pair';
        return 'nothing';
    }

    static isRoyalStraightFlush(hand) {
        if(this.isRoyalStraight(hand) && this.isFlush(hand)) return true;
        return false;
    }

    static isStraightFlush(hand) {
        if(this.isStraight(hand) && this.isFlush(hand)) return true;
        return false;
    }

    static isFourOfaKind(hand) {
        var tally = this.tallyRanks(hand);

        for(let prop in tally) {
            if(tally[prop] === 4) return true;
        }

        return false;
    }

    static isFullHouse(hand) {
        var tally = this.tallyRanks(hand);

        for(let prop in tally) {
            if(tally[prop] !== 3 && tally[prop] !== 2) return false;
        }

        return true;
    }

    static isFlush(hand) {
        var suit = hand[0].suit;
        for(let i = 0; i < 5; i++) {
            if(hand[i].suit !== suit) return false;
        }
        return true;
    }

    static isRoyalStraight(hand) {
        var ranks = this.getRanksOnly(hand);
        if(!ranks.includes(1)) return false;
        if(!ranks.includes(10)) return false;
        if(!ranks.includes(11)) return false;
        if(!ranks.includes(12)) return false;
        if(!ranks.includes(13)) return false;
        return true;
    }

    static isStraight(hand) {
        if(this.isRoyalStraight(hand)) return true;
        hand = this.sortAscending(hand);
        var start = hand[0].rank;
        for(let i = 0; i < 4; i++) {
            var thisCard = hand[i].rank;
            var nextCard = hand[i + 1].rank;
            if(nextCard === thisCard + 1) continue;
            return false;
        }
        return true;
    }

    static isThreeOfaKind(hand) {
        var tally = this.tallyRanks(hand);

        for(let prop in tally) {
            if(tally[prop] === 3) return true;
        }

        return false;
    }

    static isTwoPair(hand) {
        var tally = this.tallyRanks(hand);
        var count = 0;

        for(let prop in tally) {
            if(!tally.hasOwnProperty(prop)) continue;
            count++;
            if(tally[prop] !== 1 && tally[prop] !== 2) return false;
        }

        if(count > 3) return false;

        return true;
    }

    static isOnePair(hand) {
        var tally = this.tallyRanks(hand);
        var pair = 0;

        for(let prop in tally) {
            if(tally[prop] > 1) pair = parseInt(prop);
        }

        if(pair > 10 || pair === 1) return true;
        return false;
    }

    static sortAscending(originalHand) {
        var hand = JSON.parse(JSON.stringify(originalHand));
        return hand.sort((a, b) => {
            if(a.rank < b.rank) return -1;
            if(a.rank > b.rank) return 1;
            return 0;
        });
    }

    static tallyRanks(hand) {
        var ranks = this.getRanksOnly(hand);

        return ranks.reduce((acc, val) => {
            if(!acc.hasOwnProperty(val)) acc[val] = 0;
            acc[val]++;
            return acc;
        }, {});
    }

    static getRanksOnly(hand) {
        return hand.map(card => card.rank);
    }
}

export default HandValuator;