'use strick';
//ф-я получениия случайного числа из заданного диапазона, включая мин и мак значения. И заданы параметры по умолчанию.
const getRandomNumber = (min = 0, max = 1) => {
  // eslint-disable-next-line no-alert
  const randomNumber = (min >=0 && max >=0 && max > min) ? Math.floor(Math.random() * (max - min + 1)) + min : alert('Укажите корректное значение');
  return randomNumber;
};

getRandomNumber (10, 20);

//ф-я проверки длины комментария: если длина стр меньше 140 - возвращается true, иначе false
const checkingLengthString = (string, maxLength) => string.length <= maxLength;

checkingLengthString('ф-я получениия случайного числа из заданного диапазона, включая мин и мак значения', 140);


