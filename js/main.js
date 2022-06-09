const CARDS_COUNT = 10;
const OFFER_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
const TIMES_CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];
const TIMES_CHECKOUT = [
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

const getNegativeToZero = (number) => {
  if (number < 0) {
    number = 0;
  }
  return number;
};

const getRandomInteger = (firstNumber, secondNumber) => {  //Максимум включается, минимум включается
  firstNumber = getNegativeToZero(firstNumber);
  secondNumber = getNegativeToZero(secondNumber);

  if (firstNumber === secondNumber) {
    return firstNumber;
  }

  let min = firstNumber;
  let max = secondNumber;

  if (firstNumber > secondNumber) {
    min = secondNumber;
    max = firstNumber;
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloating = (firstNumber, secondNumber, symbolsAfterDot) => {  //Максимум включается, минимум включается
  firstNumber = getNegativeToZero(firstNumber);
  secondNumber = getNegativeToZero(secondNumber);
  symbolsAfterDot = getNegativeToZero(symbolsAfterDot);

  if (firstNumber === secondNumber) {
    return firstNumber;
  }

  let min = firstNumber;
  let max = secondNumber;

  if (firstNumber > secondNumber) {
    min = secondNumber;
    max = firstNumber;
  }

  const calcRandomNumber = Math.random() * (max - min + 1) + min;
  return parseFloat(calcRandomNumber.toFixed(symbolsAfterDot));
};

getRandomFloating(-15.258,10.147, 5); //временное использование - потом удалить

const getRandomFromFixLists = (list) => list[getRandomInteger(0, list.length - 1)];

const getRandomArrayFromListNoRepeat = (list) => {
  const returnedArray = [];
  const returnedArrayLength = getRandomInteger(0, list.length);
  while (returnedArray.length < returnedArrayLength) {
    const indexRandomItem = getRandomInteger(0, list.length - 1);
    if (returnedArray.indexOf(list[indexRandomItem]) === -1) {
      returnedArray.push(list[indexRandomItem]);
    }
  }
  return returnedArray;
};

const getAuthor = (element, index) => ({avatar: `img/avatars/user${((index + 1) < 10) ? `0${  index + 1}` : index + 1}.png`,});

const getOffer = (location) => ({
  title: 'Место заголовка',
  address: `${location.lat}, ${location.lng}`,
  price: getRandomInteger(1, 1000000),
  type: getRandomFromFixLists(OFFER_TYPES),
  rooms: getRandomInteger(1,10),
  guests: getRandomInteger(1,20),
  checkin: getRandomFromFixLists(TIMES_CHECKIN),
  checkout: getRandomFromFixLists(TIMES_CHECKOUT),
  features: getRandomArrayFromListNoRepeat(OFFER_FEATURES),
  description: 'Место описания',
  photos: getRandomArrayFromListNoRepeat(OFFER_PHOTOS),
});

const getLocation = () => ({
  lat: getRandomFloating(35.65000, 35.70000, 5),
  lng: getRandomFloating(139.70000, 139.80000, 5),
});

const getCard = (element, index) => {
  const placeLocation = getLocation();
  return {
    author: getAuthor(element, index),
    offer: getOffer(placeLocation),
    location: placeLocation,
  };
};

const generatedCards = Array.from({length: CARDS_COUNT}, getCard);

const temporaryFunct = () => generatedCards; // Временное использование, чтобы не было ошибки
temporaryFunct(); // Временное использование, чтобы не было ошибки
