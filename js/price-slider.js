import {MIN_PRICES_OF_AD, pristine} from './ad-form-validation.js';

const slider = document.querySelector('.ad-form__slider');
const houseType = document.querySelector('#type');
const adPrice = document.querySelector('#price');

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100000,
  },
  start: MIN_PRICES_OF_AD[houseType.value],
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => parseFloat(value),
  },
});

slider.noUiSlider.on('update', () => {
  adPrice.value = slider.noUiSlider.get();
  pristine.validate(adPrice);
});

adPrice.addEventListener('change', () => adPrice.value ? slider.noUiSlider.set(adPrice.value) : slider.noUiSlider.set(MIN_PRICES_OF_AD[houseType.value]));

export const resetSlider = () =>{
  slider.noUiSlider.set(MIN_PRICES_OF_AD[houseType.value]);
};
