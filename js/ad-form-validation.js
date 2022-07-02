import {isEscapeKey} from './util.js';

const form = document.querySelector('.ad-form');
const body = document.querySelector('body');
const roomNumber = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'label',
  errorTextClass: 'ad-form__label ad-form__label--error'
});

const checkRooms = (value) => {
  if (value === '100') {
    return capacity.value === '0';
  }
  if (capacity.value === '0') {
    return value === '100';
  }
  return value >= capacity.value;
};

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

  } else {
    openMessageModal('error');
  }
});


