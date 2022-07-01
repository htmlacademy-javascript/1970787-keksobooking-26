const form = document.querySelector('.ad-form');
const errorMessage = document.querySelector('#error').content.cloneNode(true);
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

pristine.addValidator(roomNumber, checkRooms, 'Количество комнат не может быть меньше количества гостей, если помещение не предназначено для гостей выберите "100 комнат"');
capacity.addEventListener('change', () => pristine.validate(roomNumber));

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    console.log('Можно отправлять');
  } else {
    console.log('неверно');

    // console.log(checkTest(roomNumber.value, capacity));
    // body.append(errorMessage);
  }
});
