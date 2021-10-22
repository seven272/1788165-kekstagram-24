import {isEscapeKey, checkingLengthString} from './utils.js';

const uploadOverlay = document.querySelector('.img-upload__overlay');
const imgUpload = document.querySelector('.img-upload__label');
const body =document.querySelector('body');
const buttonClose = document.querySelector('.img-upload__cancel');
const hashtag = document.querySelector('.text__hashtags');
const comment = document.querySelector('.text__description');
const buttonSubmit = document.querySelector('.img-upload__submit');
// const regexp = /#+[\W+]/g;
const regexp =/^#[A-Za-zА-Яа-яЁё0-9\s#]{1,99}$/;

const openUpload = (evt) => {
  evt.preventDefault();
  uploadOverlay.classList.toggle('hidden');
  body.classList.add('modal-open');
};

const closeUploadEsc = (evt) => {
  if (isEscapeKey(evt)) {
    uploadOverlay.classList.add('hidden');
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
    hashtag.setCustomValidity('Вы ввели больше 100 символов. Удалите лишнии.');
    buttonSubmit.disabled = true;
  } else if(hashtag.value.length < 2) {
    hashtag.setCustomValidity('Слишком короткий хэштег. Добавьте символов!');
    buttonSubmit.disabled = true;
  } else if (hashtag.value.search(regexp) ===-1) {
    hashtag.setCustomValidity('Использовать можно только буквы и цифры. Исправьте хэштег');
    buttonSubmit.disabled = true;
  } else {
    hashtag.setCustomValidity('');
    buttonSubmit.disabled = false;
  }
  hashtag.reportValidity();
});

//проверяем длину и корректность символов каждого хэштега перед отправкой
const checkLengthHashtag = (array) => {
  array.forEach((element) => {
    // console.log(element);
    if(element.length > 20) {
      hashtag.setCustomValidity(`Слишком длинный хэштег ${element} Замените его!`);
      alert(`Слишком длинный хэштег ${element} Замените его!`);
      buttonSubmit.disabled = true;
      return;
    }
    else {
      hashtag.setCustomValidity('');
      buttonSubmit.disabled = false;
    }
    hashtag.reportValidity();
  });
};

//форматирование введеных хэштегов и удаление дублей
const checkHashtag = () => {
  const strValue = hashtag.value;
  const arrValue = strValue.split('#');
  if(arrValue[0] === '') {
    arrValue.shift();
  }
  while(arrValue.length > 5) {
    arrValue.pop();
  }
  //вызываем ф-ю проверки длины хэштега
  checkLengthHashtag(arrValue);
  //проверяем на дубли и если такие встречаются сразу удаляем с помощью обьекта set, который затем преобразуем в массив с помощью array.from
  const arrSort = Array.from(new Set(arrValue));
  //преобразуем массив в строку. Расставляем пробелы и #
  let stringhashtag = arrSort.join(' #');
  stringhashtag = `#${stringhashtag}`;
  // console.log(stringhashtag);
};


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
buttonSubmit.addEventListener('click', checkHashtag);
