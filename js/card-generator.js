import {getRandomInteger, getRandomFloating, getRandomFromFixLists, getRandomArrayFromListNoRepeat} from './util.js';

const CARDS_COUNT = 10;
const OFFER_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
const TIMES_CHECKIN_CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];
const OFFER_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const OFFER_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const MIN_LAT = 35.65000;
const MAX_LAT = 35.70000;
const MIN_LNG = 139.70000;
const MAX_LNG = 139.80000;

const getAuthor = (element, index) => ({avatar: `img/avatars/user${((index + 1) < 10) ? `0${  index + 1}` : index + 1}.png`,});

const getOffer = (location) => ({
  title: 'Место заголовка',
  address: `${location.lat}, ${location.lng}`,
  price: getRandomInteger(1, 1000000),
  type: getRandomFromFixLists(OFFER_TYPES),
  rooms: getRandomInteger(1,10),
  guests: getRandomInteger(1,20),
  checkin: getRandomFromFixLists(TIMES_CHECKIN_CHECKOUT),
  checkout: getRandomFromFixLists(TIMES_CHECKIN_CHECKOUT),
  features: getRandomArrayFromListNoRepeat(OFFER_FEATURES),
  description: 'Место описания',
  photos: getRandomArrayFromListNoRepeat(OFFER_PHOTOS),
});

const getLocation = () => ({
  lat: getRandomFloating(MIN_LAT, MAX_LAT, 5),
  lng: getRandomFloating(MIN_LNG, MAX_LNG, 5),
});

const getCard = (element, index) => {
  const placeLocation = getLocation();
  return {
    author: getAuthor(element, index),
    offer: getOffer(placeLocation),
    location: placeLocation,
  };
};

export const getGeneratedCards = () => Array.from({length: CARDS_COUNT}, getCard);
