/* eslint-disable no-alert */
'use strick';
//ф-я получениия случайного числа из заданного диапазона, включая мин и мак значения. И заданы параметры по умолчанию.
const getRandomNumber = (min = 0, max = 1) => {
  // eslint-disable-next-line no-alert
  const randomNumber = (min >=0 && max >=0 && max > min) ? Math.floor(Math.random() * (max - min + 1)) + min : alert('Укажите корректное значение');
  return randomNumber;
};
//делаем, чтобы случайные числа из заданного диапазона не повторялись. замыкание.
const getRandomId = (min, max) => {
  const arrID = [];
  return function () {
    let currentValue = getRandomNumber(min, max);
    if (arrID.length >= (max - min +1)) {
      window.alert(`Перебраны все числа из диапазона от ${  min  } до ${  max}`);
      return null;
    }
    while(arrID.includes(currentValue)) {
      currentValue = getRandomNumber(min, max);
    }
    arrID.push(currentValue);
    return currentValue;
  };

};

//ф-я проверки длины комментария: если длина стр меньше 140 - возвращается true, иначе false
const checkingLengthString = (string, maxLength) => string.length <= maxLength;

// ф-я закрытия окна при нажатий ESC
const isEscapeKey = (evt) => evt.key === 'Escape';

checkingLengthString('ф-я получениия случайного числа из заданного диапазона, включая мин и мак значения', 140);

//создаем сообщение об ошибке при загрузке данных с сервера
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 5000);
};
export {getRandomNumber, checkingLengthString, getRandomId, isEscapeKey,showAlert };


