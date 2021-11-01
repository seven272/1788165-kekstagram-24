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
    hashtag.textContent = '';
    comment.textContent = '';
  }
};

const closeUploadClick = () => {
  uploadOverlay.classList.toggle('hidden');
  body.classList.remove('modal-open');
  hashtag.textContent = '';
  comment.textContent = '';
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


//отправка данных
const formSubmit = document.querySelector('.img-upload__form');
const main = document.querySelector('main');
const successMessage = document.querySelector('#success').content;
const errorMessage = document.querySelector('#error').content;

const buttonSuccess = successMessage.querySelector('.success__button');


const addFormSubmit = (onSuccess, onError) => {
  formSubmit.addEventListener('submit', (evt)=> {
    evt.preventDefault();
    const formData = new FormData(evt.target);

    fetch(
      'https://24.javascript.pages.academy/kekstagram1',
      {
        method: 'POST',
        body: formData,
      },
    )
      .then(() => {onSuccess()})
      .catch(() => {
        onError();
        console.log('неудача');
      });
  });

};


//показ сообщения в случаи успешной загрузки формы
const createSuccessMessage = () => {
  const successWindow = successMessage.cloneNode(true);
  main.appendChild(successWindow);
  uploadOverlay.classList.toggle('hidden');
  document.addEventListener('click', onClickWindowSucces);
  document.addEventListener('keydown',onKeyDownSucces);
};

//закрываем сообщение об успешной загрузки формы
const onClickWindowSucces = (evt) => {
  const sectionSuccessMessage = document.querySelector('.success');
  evt.preventDefault();
  sectionSuccessMessage.remove();
  console.log('кликаем по экрану');

  document.removeEventListener('click', onClickWindowSucces);
  document.removeEventListener('keydown', onKeyDownSucces);
};

const onKeyDownSucces = (evt) => {
  const sectionSuccessMessage = document.querySelector('.success');
  evt.preventDefault();
  if (isEscapeKey(evt)) {
    sectionSuccessMessage.remove();
    console.log('нажали эскейп');
    document.removeEventListener('click', onClickWindowSucces);
    document.removeEventListener('keydown', onKeyDownSucces);
  }

};

//показ сообщения в случаи ошибки загрузки формы
const createErrorMessage = () => {
  const errorWindow = errorMessage.cloneNode(true);
  main.appendChild(errorWindow);
  uploadOverlay.classList.toggle('hidden');
  document.addEventListener('click', onClickWindowError);
  document.addEventListener('keydown',onKeyDownError);
};
//закрываем сообщение об ошибке при загрузки формы
const onClickWindowError = (evt) => {
  const sectionErrorMessage = document.querySelector('.error');
  evt.preventDefault();
  sectionErrorMessage.remove();
  console.log('кликаем по экрану');
  document.removeEventListener('click', onClickWindowError);
  document.removeEventListener('keydown', onKeyDownError);
};

const onKeyDownError = (evt) => {
  const sectionErrorMessage = document.querySelector('.error');
  evt.preventDefault();
  if (isEscapeKey(evt)) {
    sectionErrorMessage.remove();
    console.log('нажали эскейп');
    document.removeEventListener('click', onClickWindowError);
    document.removeEventListener('keydown', onKeyDownError);
  }
};

addFormSubmit(createSuccessMessage, createErrorMessage);
