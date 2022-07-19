import {getAdsData} from './server-api.js';
import {showAlert} from './util.js';
import {getAdsPoints} from './map-creator.js';

const mapFiltersForm = document.querySelector('.map__filters');
const housingType = mapFiltersForm.querySelector('#housing-type');

const filterAds = (ads) =>{
  if (housingType.value !== 'any') {
    return ads.offer.type === housingType.value;
  } else {
    return true;
  }
};

getAdsData((ads) => {
  const adsList = ads.filter(filterAds).slice(0, 10);
  getAdsPoints(adsList);
}, showAlert);
