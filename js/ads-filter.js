import {getAdsData} from './server-api.js';
import {showAlert} from './util.js';
import {getAdsPoints} from './map-creator.js';

const CARDS_LIMIT = 10;
const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;

const mapFiltersForm = document.querySelector('.map__filters');
const housingTypeField = mapFiltersForm.querySelector('#housing-type');
const housingRoomsField = mapFiltersForm.querySelector('#housing-rooms');
const housingGuestsField = mapFiltersForm.querySelector('#housing-guests');
const housingPriceField = mapFiltersForm.querySelector('#housing-price');

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

mapFiltersForm.addEventListener('change', () => {
  getAdsData((ads) => {
    const adsList = ads.filter(filterAdsType).filter(filterAdsRooms).filter(filterAdsGuests).filter(filterAdsPrice).slice(0, CARDS_LIMIT);
    getAdsPoints(adsList);
  }, showAlert);
});
