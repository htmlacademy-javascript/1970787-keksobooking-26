import {isEscapeKey} from './util.js';

const form = document.querySelector('.ad-form');
const body = document.querySelector('body');
const roomNumber = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');
const adPrice = form.querySelector('#price');
const houseType = form.querySelector('#type');
const ROOMS_WITHOUT_GUESTS = '100';
const NO_GUESTS = '0';
const MIN_PRICES_OF_AD = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
  hotel: 3000,
};

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'label',
  errorTextClass: 'ad-form__label ad-form__label--error'
});

const getMinPriceOfAd = () => {
  adPrice.placeholder = MIN_PRICES_OF_AD[houseType.value];
  pristine.validate(adPrice);
};

const getMinPriceErrorMessage = () => `Минимальная цена ${adPrice.placeholder} руб.`;

const checkRooms = (value) => {
  if (value === ROOMS_WITHOUT_GUESTS) {
    return capacity.value === NO_GUESTS;
  }
  if (capacity.value === NO_GUESTS) {
    return value === ROOMS_WITHOUT_GUESTS;
  }
  return value >= capacity.value;
};

const checkPrice = (value) => value >= MIN_PRICES_OF_AD[houseType.value];

pristine.addValidator(adPrice, checkPrice, getMinPriceErrorMessage);
houseType.addEventListener('change', getMinPriceOfAd);

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessageModal(evt.currentTarget.removeTarget);
  }
};

const openMessageModal = (messageClassName) => {

  const messageTemplate = document.querySelector(`#${messageClassName}`).content.cloneNode(true);
  body.append(messageTemplate);

  const message = body.querySelector(`.${messageClassName}`);

  message.addEventListener('click', () => {closeMessageModal(message);});
  document.addEventListener('keydown', onPopupEscKeydown);
  document.removeTarget = message;
};

function closeMessageModal (message)  {
  message.remove();

  document.removeEventListener('keydown', onPopupEscKeydown);
}

pristine.addValidator(roomNumber, checkRooms, 'Количество комнат не может быть меньше количества гостей, если помещение не предназначено для гостей выберите "100 комнат"');
capacity.addEventListener('change', () => pristine.validate(roomNumber));

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    openMessageModal('success');
    form.submit();
  //todo add reset form function
  } else {
    openMessageModal('error');
  }
});


