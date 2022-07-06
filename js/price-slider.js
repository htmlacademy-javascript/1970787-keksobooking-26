import {MIN_PRICES_OF_AD, pristine} from './ad-form-validation.js';

const sliderElement = document.querySelector('.ad-form__slider');
const houseType = document.querySelector('#type');
const adPrice = document.querySelector('#price');

noUiSlider.create(sliderElement, {
  range: {
    min: MIN_PRICES_OF_AD[houseType.value],
    max: 100000,
  },
  start: MIN_PRICES_OF_AD[houseType.value],
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', () => {
  adPrice.value = sliderElement.noUiSlider.get();
  pristine.validate(adPrice);
});

houseType.addEventListener('change', () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: MIN_PRICES_OF_AD[houseType.value],
      max: 100000,
    }
  });
  sliderElement.noUiSlider.set(MIN_PRICES_OF_AD[houseType.value]);
});
