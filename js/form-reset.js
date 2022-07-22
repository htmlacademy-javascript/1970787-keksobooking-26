import {resetSlider} from './price-slider.js';
import {resetMap} from './map-creator.js';
import {setFilter} from './ads-filter.js';
import {onHouseTypeChange} from './ad-form-validation.js';

const adForm = document.querySelector('.ad-form');
const filtersForm = document.querySelector('.map__filters');
const avatarPreview = adForm.querySelector('.ad-form-header__preview img');
const adPhotoPreviewContainer = document.querySelector('.ad-form__photo');

adForm.addEventListener('reset', ()=> {
  avatarPreview.src = 'img/muffin-grey.svg';
  adPhotoPreviewContainer.innerHTML = '';
  filtersForm.reset();
  setTimeout(() => {
    onHouseTypeChange();
    resetSlider();
    resetMap();
    setFilter();
  });
});
