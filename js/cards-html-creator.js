// import {getGeneratedCards} from './card-generator.js'; //todo удалить card-generator

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
// export const generatedData = getGeneratedCards();
export const cardsFragment = document.createDocumentFragment();
const buildingTypes = document.querySelector('#type').children;
const offerTypes = {};

for (let i = 0; i < buildingTypes.length; i++) {
  offerTypes[buildingTypes[i].value]= buildingTypes[i].textContent;
}

export const getAdCards = (ads) => {
  ads.forEach(({author,offer}, index) => {
    const cardElement = cardTemplate.cloneNode(true);
    const featuresContainer = cardElement.querySelector('.popup__features');
    const featuresList = featuresContainer.querySelectorAll('.popup__feature');
    const photosContainer = cardElement.querySelector('.popup__photos');
    const photoTemplate = photosContainer.querySelector('.popup__photo');
    const photosFragment = document.createDocumentFragment();

    if (author.avatar) {
      cardElement.querySelector('.popup__avatar').src = author.avatar;
    } else {
      cardElement.querySelector('.popup__avatar').remove();
    }

    if (offer.title) {
      cardElement.querySelector('.popup__title').textContent = `${offer.title} ${index + 1}`;
    } else {
      cardElement.querySelector('.popup__title').remove();
    }

    if (offer.address) {
      cardElement.querySelector('.popup__text--address').textContent = offer.address;
    } else {
      cardElement.querySelector('.popup__text--address').remove();
    }

    if (offer.price) {
      cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
    } else {cardElement.querySelector('.popup__text--price').remove();}

    if (offer.type) {
      cardElement.querySelector('.popup__type').textContent = offerTypes[offer.type];
    } else {
      cardElement.querySelector('.popup__type').remove();
    }

    if (offer.rooms && offer.guests) {
      cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    } else {
      if (offer.rooms) {
        cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты`;
      } else {
        if (offer.guests) {
          cardElement.querySelector('.popup__text--capacity').textContent = `Для ${offer.guests} гостей`;
        }else {
          cardElement.querySelector('.popup__text--capacity').remove();
        }
      }
    }

    if (offer.checkin && offer.checkout) {
      cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
    } else {
      if (offer.checkin) {
        cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}`;
      } else {
        if (offer.checkout) {
          cardElement.querySelector('.popup__text--time').textContent = `Выезд до ${offer.checkout}`;
        } else {
          cardElement.querySelector('.popup__text--time').remove();
        }
      }
    }

    if (offer.description) {
      cardElement.querySelector('.popup__description').textContent = `${offer.description} ${index + 1}`;
    } else {
      cardElement.querySelector('.popup__description').remove();
    }

    if (offer.features) {
      featuresList.forEach((featuresListItem) => {
        const isNesessary = offer.features.some(
          (feature) => featuresListItem.classList.contains(`popup__feature--${feature}`)
        );
        if (!isNesessary) {
          featuresListItem.remove();
        }
      });
    } else {
      featuresContainer.remove();
    }

    if (offer.photos) {
      offer.photos.forEach((photo) => {
        const photoElement = photoTemplate.cloneNode(true);
        photoElement.src = photo;
        photosFragment.append(photoElement);
      });
      photosContainer.replaceChildren(photosFragment);

    } else {
      photosContainer.remove();
    }

    cardsFragment.append(cardElement);
  });
  return cardsFragment;
};

