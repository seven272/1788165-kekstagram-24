/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import {isEscapeKey} from './utils.js';
import {resettingSettingsPicture} from './scale-slider.js';
const uploadOverlay = document.querySelector('.img-upload__overlay');
const hashtag = document.querySelector('.text__hashtags');
const comment = document.querySelector('.text__description');
//отправка данных
const formSubmit = document.querySelector('.img-upload__form');
const main = document.querySelector('main');
const successMessage = document.querySelector('#success').content;
const errorMessage = document.querySelector('#error').content;


const addFormSubmit = (onSuccess, onError) => {
  formSubmit.addEventListener('submit', (evt)=> {
    evt.preventDefault();
    const formData = new FormData(evt.target);

    fetch(
      'https://24.javascript.pages.academy/kekstagram',
      {
        method: 'POST',
        body: formData,
      },
    )
      .then ((response) => {
        if (response.ok) {
          onSuccess ();
          return;
        }
        onError ();
      });
  });

};

//показ сообщения в случаи успешной загрузки формы
const createSuccessMessage = () => {
  const successWindow = successMessage.cloneNode(true);
  main.appendChild(successWindow);
  uploadOverlay.classList.toggle('hidden');
  resetInputAndPicture();
  document.addEventListener('click', onClickWindowSucces);
  document.addEventListener('keydown',onKeyDownSucces);
};

//закрываем сообщение об успешной загрузки формы
const onClickWindowSucces = (evt) => {
  const sectionSuccessMessage = document.querySelector('.success');
  evt.preventDefault();
  sectionSuccessMessage.remove();
  document.body.style.overflowY='auto';
  document.removeEventListener('click', onClickWindowSucces);
  document.removeEventListener('keydown', onKeyDownSucces);

};

const onKeyDownSucces = (evt) => {
  const sectionSuccessMessage = document.querySelector('.success');
  evt.preventDefault();
  if (isEscapeKey(evt)) {
    sectionSuccessMessage.remove();
    document.body.style.overflowY='auto';
    document.removeEventListener('click', onClickWindowSucces);
    document.removeEventListener('keydown', onKeyDownSucces);
  }

};

//показ сообщения в случаи ошибки загрузки формы
const createErrorMessage = () => {
  const errorWindow = errorMessage.cloneNode(true);
  main.appendChild(errorWindow);
  uploadOverlay.classList.toggle('hidden');
  resetInputAndPicture();
  document.addEventListener('click', onClickWindowError);
  document.addEventListener('keydown',onKeyDownError);
};
//закрываем сообщение об ошибке при загрузки формы
const onClickWindowError = (evt) => {
  const sectionErrorMessage = document.querySelector('.error');
  evt.preventDefault();
  sectionErrorMessage.remove();
  document.body.style.overflowY='auto';
  document.removeEventListener('click', onClickWindowError);
  document.removeEventListener('keydown', onKeyDownError);
};

const onKeyDownError = (evt) => {
  const sectionErrorMessage = document.querySelector('.error');
  evt.preventDefault();
  if (isEscapeKey(evt)) {
    sectionErrorMessage.remove();
    document.body.style.overflowY='auto';
    document.removeEventListener('click', onClickWindowError);
    document.removeEventListener('keydown', onKeyDownError);
  }
};
//очистака инпутов
const resetInputAndPicture = () => {
  hashtag.value = '';
  comment.value = '';
  resettingSettingsPicture();
};

addFormSubmit(createSuccessMessage, createErrorMessage);

