import {isEscapeKey, checkingLengthString} from './utils.js';

const uploadOverlay = document.querySelector('.img-upload__overlay');
const imgUpload = document.querySelector('.img-upload__label');
const body =document.querySelector('body');
const buttonClose = document.querySelector('.img-upload__cancel');
const hashtag = document.querySelector('.text__hashtags');
const comment = document.querySelector('.text__description');
const buttonSubmit = document.querySelector('.img-upload__submit');


const openUpload = (evt) => {
  evt.preventDefault();
  uploadOverlay.classList.toggle('hidden');
  body.classList.add('modal-open');
};

const closeUploadEsc = (evt) => {
  if (isEscapeKey(evt)) {
    uploadOverlay.classList.toggle('hidden');
    body.classList.remove('modal-open');
  }
};

const closeUploadClick = () => {
  uploadOverlay.classList.toggle('hidden');
  body.classList.remove('modal-open');
};

//валидация

//выводим сообщения об ошибках в момент ввода пользователем хэштегов
hashtag.addEventListener('input', () => {
  if(hashtag.value.length > 100) {
    hashtag.setCustomValidity('Слишком длинный хэштег. Уберите лишние символы!');
    buttonSubmit.disabled = true;
  } else if(hashtag.value.length < 2) {
    hashtag.setCustomValidity('Слишком короткий хэштег. Добавьте символов!');
    buttonSubmit.disabled = true;
  } else if (/[а-яА-ЯёЁa-zA-Z0-9\s#]/.test(hashtag.value) === false) {
    hashtag.setCustomValidity('Использовать можно только буквы и цифры');
    buttonSubmit.disabled = true;
  } else {
    hashtag.setCustomValidity('');
    buttonSubmit.disabled = false;
  }
  hashtag.reportValidity();
});


hashtag.addEventListener('click', () => {
  console.log(hashtag.value);
  const strValue = hashtag.value;
  const arrValue = strValue.split('#');
  console.log(arrValue);
  if(arrValue[0] === '') {
    arrValue.shift();
  }
  while(arrValue.length > 5) {
    arrValue.pop();
  }
  console.log(arrValue);
  arrValue.forEach((element) => {
    if(element.length > 20) {

      console.log(`Слишком длинный хэштег ${element} Замените его!`);
    }
  });

  //проверяем на дубли и если такие встречаются сразу удаляем с помощью обьекта set, который затем преобразуем в массив с помощью array.from
  const arrSort = Array.from(new Set(arrValue));
  console.log(arrSort);

  //преобразуем массив в строку

  let stringhashteag = arrSort.join(' #');
  stringhashteag = `#${stringhashteag}`;
  console.log(stringhashteag);
});

//поле ввода комментария
const checkInputComment = () => {
  const MAX_LENGTH = 140;
  if(checkingLengthString(comment.value, MAX_LENGTH) === false) {
    comment.setCustomValidity(`Слишком длинный комметарий. Уберите лишние символы в количестве ${comment.value.length - MAX_LENGTH} шт`);
    buttonSubmit.disabled = true;
  } else {
    comment.setCustomValidity('');
    buttonSubmit.disabled = false;
  }
  comment.reportValidity();
};

//очистка input при нажатий Esc

const clearInputs = (evt) => {
  evt.stopPropagation();
  if (isEscapeKey(evt)) {
    comment.value = '';
    hashtag.value = '';
  }

};


//слушатели
imgUpload.addEventListener('click', openUpload);
buttonClose.addEventListener('click', closeUploadClick);
document.addEventListener('keydown', closeUploadEsc);
comment.addEventListener('input', checkInputComment);
comment.addEventListener('keydown',clearInputs);
hashtag.addEventListener('keydown', clearInputs);
