<template>
    <div id="app">
        <div class="money">
            <p class="balance">Cash: ${{ balance }}</p>
            <p>
                <label for="bet">Bet amount:</label>
                <input type="number" id="bet" class="bet" min="5" :max="balance" step="5" v-model.number="bet" :disabled="turn === 1" />
            </p>
        </div>
        <div class="hand">
            <div class="card"
                v-if="hand.length"
                v-for="(card, index) in hand"
                :key="card.suit+card.rank"
                :class="{ 'locked': card.lock }"
                @click="toggleLock(index)">
                <svg><use :xlink:href="cardImg(card)" /></svg>
            </div>
        </div>
        <p class="score">{{ this.score | uppercase }}</p>
        <div class="buttons">
            <button @click="draw" v-if="turn === 1">Draw</button>
            <button @click="deal" v-if="turn === 2">Deal</button>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import Deck from '../classes/Deck.js';
import HandValuator from '../classes/HandValuator.js';
import data from "../data.js";

var multipliers = data.multipliers;

export default {
    data() {
        return {
            deck: [],
            hand: [],
            turn: 2,
            balance: 100,
            bet: 5,
            score: 'Press deal to start'
        };
    },

    methods: {
        deal() {
            this.deck = Deck.newDeck();
            var hand = Deck.draw(this.deck, 5);
            this.hand = hand.map(card => {
                card.lock = false;
                return card;
            });
            this.balance -= this.bet;
            this.score = 'Choose cards to hold';
            this.turn = 1;
        },

        cardImg(card) {
            return `#${card.suit}-${card.rank}`;
        },

        toggleLock(index) {
            var newCard = this.hand.slice(index, index + 1)[0];
            newCard.lock = !newCard.lock;
            Vue.set(this.hand, index, newCard);
        },

        draw() {
            this.hand = this.hand.map(card => {
                if(card.lock) return card;
                return Deck.draw(this.deck)[0];
            });
            this.score = HandValuator.scoreHand(this.hand);
            this.turn = 2;
            if(this.score === 'nothing') return;
            this.balance = this.balance + (this.bet * multipliers[this.score]);
        }
    },

    filters: {
        uppercase(text) {
            return text.toUpperCase();
        }
    }
}
</script>
