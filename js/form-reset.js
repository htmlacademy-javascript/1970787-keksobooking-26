import {resetSlider} from './price-slider.js';
import {resetMap} from './map-creator.js';

const adForm = document.querySelector('.ad-form');
const filtersForm = document.querySelector('.map__filters');

adForm.addEventListener('reset', ()=> {
  filtersForm.reset();
  resetSlider();
  setTimeout(() => {
    resetMap();
  });
});