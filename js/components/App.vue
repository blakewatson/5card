<template>
    <div id="app">
        <div class="game">
            <div class="money">
                <p class="balance">Cash: ${{ balance }}</p>
                <p>
                    <label for="bet">Bet amount:</label>
                    <input type="number" id="bet" class="bet" min="5" :max="balance" step="5" v-model.number="bet" :disabled="turn === 1" />
                    <button class="bet-up" :disabled="turn === 1" @click="betUp"><span>Up</span></button>
                    <button class="bet-down" :disabled="turn === 1" @click="betDown"><span>Down</span></button>
                </p>
            </div>
            <div class="hand">
                <div class="card"
                    v-if="hand.length"
                    v-for="(card, index) in hand"
                    :key="card.suit+card.rank"
                    :class="{ 'locked': card.lock }"
                    @mousedown="toggleLock(index)">
                    <svg><use :xlink:href="cardImg(card)" /></svg>
                </div>
            </div>
            <p class="score">{{ this.msg | uppercase }}</p>
            <div class="buttons">
                <button class="secondary" @click="view = 'rules'">Rules</button>
                <button @click="draw" v-if="turn === 1">Draw</button>
                <button @click="deal" v-if="turn === 2 && balance > 0">Deal</button>
                <button @click="reset" v-if="turn === 2 && balance === 0">Reset</button>
            </div>
        </div>
        <rules v-show="view === 'rules'" @close-rules="view = 'game'"></rules>
    </div>
</template>

<script>
import Vue from 'vue';
import Deck from '../classes/Deck.js';
import HandValuator from '../classes/HandValuator.js';
import data from "../data.js";
import Rules from './Rules.vue'

var multipliers = data.multipliers;

export default {
    data() {
        return {
            view: 'game',
            deck: [],
            hand: [],
            turn: 2,
            balance: 100,
            bet: 5,
            msg: 'Press deal to start'
        };
    },

    methods: {
        deal() {
            if(this.balance < this.bet) {
                this.msg = 'Not enough cash for that bet.';
                return;
            }
            this.deck = Deck.newDeck();
            var hand = Deck.draw(this.deck, 5);
            this.hand = hand.map(card => {
                card.lock = false;
                return card;
            });
            this.balance -= this.bet;
            this.msg = 'Choose cards to hold';
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
            this.msg = HandValuator.scoreHand(this.hand);
            this.turn = 2;
            if(this.msg === 'nothing') return;
            this.balance = this.balance + (this.bet * multipliers[this.msg]);
        },

        betUp() {
            if(this.turn !== 2) return;
            this.bet += 5;
        },

        betDown() {
            if(this.turn !== 2) return;
            if(this.bet < 6) return;
            this.bet -= 5;
        },

        reset() {
            this.balance = 100;
            this.bet = 5;
            this.turn = 2;
            this.msg = 'Press deal to start';
            this.hand = [];
        },
    },

    watch: {
        balance(newVal) {
            window.localStorage.setItem('balance', newVal);
        }
    },

    filters: {
        uppercase(text) {
            return text.toUpperCase();
        }
    },

    components: {
        'rules': Rules
    },

    beforeMount() {
        var balance = window.localStorage.getItem('balance');
        if(balance === null) return;
        this.balance = parseInt(balance);
    }
}
</script>
