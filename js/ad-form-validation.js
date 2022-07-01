const form = document.querySelector('.ad-form');
const errorMessage = document.querySelector('#error').content.cloneNode(true);
const body = document.querySelector('body');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'label',
  errorTextClass: 'ad-form__label ad-form__label--error'
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    console.log('Можно отправлять');
  } else {
    console.log('неверно');
    // body.append(errorMessage);
  }
});

