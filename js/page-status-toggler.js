const adForm = document.querySelector('.ad-form');
const adFormList = adForm.querySelectorAll('fieldset');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersFormList = mapFiltersForm.querySelectorAll('select, fieldset');

const getPageDisabled = () => {

  //todo disabled map field

  adForm.classList.add('ad-form--disabled');
  //todo disabled slider
  adFormList.forEach((adFormItem) => {
    adFormItem.disabled = true;
  });

  mapFiltersForm.classList.add('map__filters--disabled');

  mapFiltersFormList.forEach((mapFiltersFormItem) => {
    mapFiltersFormItem.disabled = true;
  });
};

const getPageEnabled = () => {

  //todo enabled map field

  adForm.classList.remove('ad-form--disabled');
  //todo enabled slider
  adFormList.forEach((adFormItem) => {
    adFormItem.disabled = false;
  });

  mapFiltersForm.classList.remove('map__filters--disabled');

  mapFiltersFormList.forEach((mapFiltersFormItem) => {
    mapFiltersFormItem.disabled = false;
  });
};

getPageDisabled();
getPageEnabled();
