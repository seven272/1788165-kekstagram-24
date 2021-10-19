/* eslint-disable no-console */
'use strick';
//ф-я получениия случайного числа из заданного диапазона, включая мин и мак значения. И заданы параметры по умолчанию.
const getRandomNumber = (min = 0, max = 1) => {
  // eslint-disable-next-line no-alert
  const randomNumber = (min >=0 && max >=0 && max > min) ? Math.floor(Math.random() * (max - min + 1)) + min : alert('Укажите корректное значение');
  return randomNumber;
};

// getRandomNumber (10, 20);

//делаем, чтобы случайные числа из заданного диапазона не повторялись. замыкание.
const getRandomId = (min, max) => {
  const arrID = [];
  return function () {
    let currentValue = getRandomNumber(min, max);
    if (arrID.length >= (max - min +1)) {
      console.error(`Перебраны все числа из диапазона от ${  min  } до ${  max}`);
      return null;
    }
    while(arrID.includes(currentValue)) {
      currentValue = getRandomNumber(min, max);
    }
    arrID.push(currentValue);
    return currentValue;
  };

};

//  let random = getRandomId(1,3);
//  console.log(random())

//ф-я проверки длины комментария: если длина стр меньше 140 - возвращается true, иначе false
const checkingLengthString = (string, maxLength) => string.length <= maxLength;

// ф-я закрытия окна при нажатий ESC
const isEscapeKey = (evt) => evt.key === 'Escape';

checkingLengthString('ф-я получениия случайного числа из заданного диапазона, включая мин и мак значения', 140);
export {getRandomNumber, checkingLengthString, getRandomId, isEscapeKey };


