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

getRandomInteger(15.258, 10.147); //временное использование - потом удалить

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
