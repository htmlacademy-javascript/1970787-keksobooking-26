function getRandomInt(firstNumber, secondNumber) {  //Максимум не включается, минимум включается
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
  return Math.floor(Math.random() * (max - min)) + min;
}

getRandomInt(15.258,10.147);
