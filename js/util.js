const ALERT_SHOW_TIME = 5000;

const getNegativeToZero = (number) => {
  if (number < 0) {
    number = 0;
  }
  return number;
};

export const getRandomInteger = (firstNumber, secondNumber) => {  //Максимум включается, минимум включается
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

export const getRandomFloating = (firstNumber, secondNumber, symbolsAfterDot) => {  //Максимум включается, минимум включается
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

export const getRandomFromFixLists = (list) => list[getRandomInteger(0, list.length - 1)];

export const getRandomArrayFromListNoRepeat = (list) => {
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

export const isEscapeKey = (evt) => evt.key === 'Escape';

export const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};
