const adForm = document.querySelector('.ad-form');
const adFormList = adForm.querySelectorAll('fieldset');
const mapFiltersForm = document.querySelector('.map__filters');
const sliderElement = document.querySelector('.ad-form__slider');
const mapFiltersFormList = mapFiltersForm.querySelectorAll('select, fieldset');

const getPageDisabled = () => {

  adForm.classList.add('ad-form--disabled');
  sliderElement.setAttribute('disabled', true);
  adFormList.forEach((adFormItem) => {
    adFormItem.disabled = true;
  });

  mapFiltersForm.classList.add('map__filters--disabled');

  mapFiltersFormList.forEach((mapFiltersFormItem) => {
    mapFiltersFormItem.disabled = true;
  });
};

export const getPageEnabled = () => {

  adForm.classList.remove('ad-form--disabled');
  sliderElement.removeAttribute('disabled');
  adFormList.forEach((adFormItem) => {
    adFormItem.disabled = false;
  });

  mapFiltersForm.classList.remove('map__filters--disabled');

  mapFiltersFormList.forEach((mapFiltersFormItem) => {
    mapFiltersFormItem.disabled = false;
  });
};

getPageDisabled();
