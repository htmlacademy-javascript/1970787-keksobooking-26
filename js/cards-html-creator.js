import {getGeneratedCards} from './card-generator.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas'); // будем временно вставлять карточки сюда
const generatedData = getGeneratedCards();
const cardsFragment = document.createDocumentFragment();

generatedData.forEach(({author,offer,location}) =>{
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = offer.price + ' ₽/ночь';
  cardsFragment.append(cardElement);
});

// console.log(cardsFragment.children);

mapCanvas.append(cardsFragment.children[0]);
