/* eslint-disable no-alert */

// ф-я закрытия окна при нажатий ESC
const isEscapeKey = (evt) => evt.key === 'Escape';
//создаем сообщение об ошибке при загрузке данных с сервера
const showAlert = (message) => {
  const TIME_SHOW_MESSAGE = 5000;
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
  }, TIME_SHOW_MESSAGE);
};
export {isEscapeKey,showAlert };


