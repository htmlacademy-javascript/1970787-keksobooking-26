import {getAdsData} from './server-api.js';
import {showAlert} from './util.js';
import {getAdsPoints} from './map-creator.js';

const CARDS_LIMIT = 10;

const mapFiltersForm = document.querySelector('.map__filters');
const housingTypeField = mapFiltersForm.querySelector('#housing-type');
const housingRoomsField = mapFiltersForm.querySelector('#housing-rooms');

const filterAdsType = (ads) =>{
  if (housingTypeField.value !== 'any') {
    return ads.offer.type === housingTypeField.value;
  } else {
    return true;
  }
};

const filterAdsRooms = (ads) =>{
  if (housingRoomsField.value !== 'any') {
    return ads.offer.rooms === +housingRoomsField.value;
  } else {
    return true;
  }
};

mapFiltersForm.addEventListener('change', () => {
  getAdsData((ads) => {
    const adsList = ads.filter(filterAdsType).filter(filterAdsRooms).slice(0, CARDS_LIMIT);
    getAdsPoints(adsList);
  }, showAlert);
});
