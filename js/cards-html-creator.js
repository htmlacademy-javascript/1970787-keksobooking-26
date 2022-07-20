const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const buildingTypes = document.querySelector('#type').children;
const offerTypes = {};

for (let i = 0; i < buildingTypes.length; i++) {
  offerTypes[buildingTypes[i].value]= buildingTypes[i].textContent;
}

export const getAdCards = (ads) => {
  const cardsFragment = document.createDocumentFragment();
  ads.forEach(({author,offer}) => {
    const card = cardTemplate.cloneNode(true);
    const featuresContainer = card.querySelector('.popup__features');
    const featuresList = featuresContainer.querySelectorAll('.popup__feature');
    const photosContainer = card.querySelector('.popup__photos');
    const photoTemplate = photosContainer.querySelector('.popup__photo');
    const photosFragment = document.createDocumentFragment();

    if (author.avatar) {
      card.querySelector('.popup__avatar').src = author.avatar;
    } else {
      card.querySelector('.popup__avatar').remove();
    }

    if (offer.title) {
      card.querySelector('.popup__title').textContent = offer.title;
    } else {
      card.querySelector('.popup__title').remove();
    }

    if (offer.address) {
      card.querySelector('.popup__text--address').textContent = offer.address;
    } else {
      card.querySelector('.popup__text--address').remove();
    }

    if (offer.price) {
      card.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
    } else {card.querySelector('.popup__text--price').remove();}

    if (offer.type) {
      card.querySelector('.popup__type').textContent = offerTypes[offer.type];
    } else {
      card.querySelector('.popup__type').remove();
    }

    if (offer.rooms && offer.guests) {
      card.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    } else {
      if (offer.rooms) {
        card.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты`;
      } else {
        if (offer.guests) {
          card.querySelector('.popup__text--capacity').textContent = `Для ${offer.guests} гостей`;
        }else {
          card.querySelector('.popup__text--capacity').remove();
        }
      }
    }

    if (offer.checkin && offer.checkout) {
      card.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
    } else {
      if (offer.checkin) {
        card.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}`;
      } else {
        if (offer.checkout) {
          card.querySelector('.popup__text--time').textContent = `Выезд до ${offer.checkout}`;
        } else {
          card.querySelector('.popup__text--time').remove();
        }
      }
    }

    if (offer.description) {
      card.querySelector('.popup__description').textContent = offer.description;
    } else {
      card.querySelector('.popup__description').remove();
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
      offer.photos.forEach((img) => {
        const photo = photoTemplate.cloneNode(true);
        photo.src = img;
        photosFragment.append(photo);
      });
      photosContainer.replaceChildren(photosFragment);

    } else {
      photosContainer.remove();
    }

    cardsFragment.append(card);
  });
  return cardsFragment;
};

