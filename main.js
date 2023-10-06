/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/validators.js
function isValidCard(value) {
  if (value.length === 0) {
    return false;
  }
  let sum = 0;
  const nDigits = value.length;
  const parity = nDigits % 2;
  let digit;
  for (let i = 0; i < nDigits; i += 1) {
    digit = Number(value[i]);
    if (i % 2 === parity) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
  }
  return sum % 10 === 0;
}
function getCardType(value) {
  if (value[0] === '2') {
    return 'mir';
  }
  if (value[0] === '4') {
    return 'visa';
  }
  if (value[0] === '5') {
    return 'mastercard';
  }
  if (value.substr(0, 2) === '34' || value.substr(0, 2) === '37') {
    return 'amex';
  }
  if (value.substr(0, 2) === '60') {
    return 'discover';
  }
  if (value.substr(0, 2) === '31' || value.substr(0, 2) === '35') {
    return 'jcb';
  }
  if (value.substr(0, 2) === '30' || value.substr(0, 2) === '36' || value.substr(0, 2) === '38') {
    return 'diners';
  }
  return 'others';
}
;// CONCATENATED MODULE: ./src/js/widget.js

class CardFormWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.cards = ['mir', 'visa', 'mastercard', 'amex', 'discover', 'jcb', 'diners'];
    this.onSubmit = this.onSubmit.bind(this);
  }
  static get markup() {
    return `
      <div class="board"></div>
      <form class="card-form-widget">
        <input type="text" id="card-input" class="input">
        <button class="submit">Click to Validate</button>
      </form>
    `;
  }
  static get boardSelector() {
    return '.board';
  }
  static get submitSelector() {
    return '.submit';
  }
  static get inputSelector() {
    return '.input';
  }
  static get selector() {
    return '.card-form-widget';
  }
  bindToDOM() {
    this.parentEl.innerHTML = CardFormWidget.markup;
    this.boardEl = this.parentEl.querySelector(CardFormWidget.boardSelector);
    for (let i = 0; i < this.cards.length; i += 1) {
      const cellEl = document.createElement('div');
      cellEl.classList.add('cell');
      this.boardEl.appendChild(cellEl);
    }
    this.element = this.parentEl.querySelector(CardFormWidget.selector);
    this.submit = this.element.querySelector(CardFormWidget.submitSelector);
    this.input = this.element.querySelector(CardFormWidget.inputSelector);
    this.redrawPositions();
    this.element.addEventListener('submit', this.onSubmit);
  }
  redrawPositions() {
    const cardType = getCardType(this.input.value);
    const isValid = isValidCard(this.input.value);
    for (let i = 0; i < this.cards.length; i += 1) {
      this.boardEl.children[i].innerHTML = '';
      const cellEl = this.boardEl.children[i];
      const charEl = document.createElement('div');
      if (this.cards[i] === cardType && isValid === true) {
        charEl.classList.add('card', this.cards[i]);
      } else {
        charEl.classList.add('card', `${this.cards[i]}-no`);
      }
      cellEl.appendChild(charEl);
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const {
      value
    } = this.input;
    if (isValidCard(value)) {
      this.input.classList.add('valid');
      this.input.classList.remove('invalid');
    } else {
      this.input.classList.add('invalid');
      this.input.classList.remove('valid');
    }
    this.redrawPositions();
  }
}
;// CONCATENATED MODULE: ./src/js/app.js

const container = document.querySelector('.container');
const app_form = new CardFormWidget(container);
app_form.bindToDOM();
;// CONCATENATED MODULE: ./src/index.js



// TODO: write your code in app.js
/******/ })()
;