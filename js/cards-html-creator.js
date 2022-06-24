import {getGeneratedCards} from './card-generator.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas'); // будем временно вставлять карточки сюда
const generatedData = getGeneratedCards();
const cardsFragment = document.createDocumentFragment();
const buildingTypes = document.querySelector('#type').children;
const offerTypes = {};

for (let i = 0; i < buildingTypes.length; i++) {
  offerTypes[buildingTypes[i].value]= buildingTypes[i].textContent;
}

generatedData.forEach(({author,offer}) => {
  const cardElement = cardTemplate.cloneNode(true);
  const featuresContainer = cardElement.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  const photosContainer = cardElement.querySelector('.popup__photos');
  const photoTemplate = photosContainer.querySelector('.popup__photo');
  const photosFragment = document.createDocumentFragment();

  cardElement.querySelector('.popup__avatar').src = author.avatar;
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = offerTypes[offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  cardElement.querySelector('.popup__description').textContent = offer.description;

  featuresList.forEach((featuresListItem) => {
    const isNesessary = offer.features.some(
      (feature) => featuresListItem.classList.contains(`popup__feature--${feature}`)
    );
    if (!isNesessary) {
      featuresListItem.remove();
    }
  });

  offer.photos.forEach((photo) => {
    const photoElement = photoTemplate.cloneNode(true);
    photoElement.src = photo;
    photosFragment.append(photoElement);
  });

  photosContainer.replaceChildren(photosFragment);
  cardsFragment.append(cardElement);
});

mapCanvas.append(cardsFragment.children[0]);
