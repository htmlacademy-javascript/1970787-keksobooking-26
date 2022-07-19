import {getAdsData} from './server-api.js';
import {showAlert} from './util.js';
import {getAdsPoints} from './map-creator.js';
import {debounce} from './util.js';

const CARDS_LIMIT = 10;
const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;
const RERENDER_TIMEOUT = 500;

const mapFiltersForm = document.querySelector('.map__filters');
const housingTypeField = mapFiltersForm.querySelector('#housing-type');
const housingRoomsField = mapFiltersForm.querySelector('#housing-rooms');
const housingGuestsField = mapFiltersForm.querySelector('#housing-guests');
const housingPriceField = mapFiltersForm.querySelector('#housing-price');
const housingFeaturesField = mapFiltersForm.querySelector('#housing-features');

const filterAdsType = (ads) => housingTypeField.value !== 'any' ? ads.offer.type === housingTypeField.value : true;

const filterAdsRooms = (ads) => housingRoomsField.value !== 'any' ? ads.offer.rooms === +housingRoomsField.value : true;

const filterAdsGuests = (ads) => housingGuestsField.value !== 'any' ? ads.offer.guests === +housingGuestsField.value : true;

const filterAdsPrice = (ads) => {
  const adsPrice = () => {
    if (ads.offer.price < LOW_PRICE) {
      return 'low';
    } else {
      if (ads.offer.price > HIGH_PRICE) {
        return 'high';
      } else {
        return 'middle';
      }
    }
  };
  return housingPriceField.value !== 'any' ? adsPrice() === housingPriceField.value : true;
};

const filterAdsFeatures = (ads) => {
  const checkedFeatures = Array.from(housingFeaturesField.querySelectorAll(':checked')).map((inputElement) => inputElement.value);
  let test = false;
  if (checkedFeatures.length > 0) {
    if (ads.offer.features) {
      for (let i = 0; i < ads.offer.features.length; i++) {
        if (checkedFeatures.some((checkedFeature) => checkedFeature === ads.offer.features[i])) {
          test = true;
        }
      }
    }
  } else {
    test = true;
  }
  return test;
};

const getAdsFeaturesRank = (ads) => {
  const checkedFeatures = Array.from(housingFeaturesField.querySelectorAll(':checked')).map((inputElement) => inputElement.value);
  let rank = 0;
  if (ads.offer.features) {
    ads.offer.features.forEach((offerFeature) => {
      if (checkedFeatures.some((checkedFeature) => checkedFeature === offerFeature)) {
        rank++;
      }
    });
  }
  return rank;
};

const compareAdsFeatures = (adA, adB) =>{
  const rankA = getAdsFeaturesRank(adA);
  const rankB = getAdsFeaturesRank(adB);

  return rankB - rankA;
};


export const setFilter = () =>{
  getAdsData((ads) => {
    const adsList = ads
      .filter(filterAdsType)
      .filter(filterAdsRooms)
      .filter(filterAdsGuests)
      .filter(filterAdsPrice)
      .filter(filterAdsFeatures)
      .slice()
      .sort(compareAdsFeatures)
      .slice(0, CARDS_LIMIT);
    getAdsPoints(adsList);
  }, showAlert);
};

mapFiltersForm.addEventListener('change', debounce(setFilter, RERENDER_TIMEOUT));
