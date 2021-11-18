import {isEscapeKey, checkingLengthString} from './utils.js';
const LATTICE = '#';
const MIN_LENGTH_HASHTAG = 2;
const MAX_LENGTH_HASHTAG = 20;
const QUANTITY = 5;
const hashtag = document.querySelector('.text__hashtags');
const comment = document.querySelector('.text__description');
const buttonSubmit = document.querySelector('.img-upload__submit');
const formSubmit = document.querySelector('.img-upload__form');

//выводим сообщения об ошибках в момент ввода пользователем хэштегов
const verificationHashtag = () => {
  const hashtagValue = hashtag.value.toLowerCase().trim().split(' ');
  

  hashtagValue.forEach((element) => {
   
    if(element !== '' && element.length < MIN_LENGTH_HASHTAG) {
      hashtag.setCustomValidity('Слишком короткий хэштег. Добавьте символов!');
      buttonSubmit.disabled = true;
    } else if(element[0] !== LATTICE) {
      hashtag.setCustomValidity(`Имя должно начинаться с ${  LATTICE}`);
      buttonSubmit.disabled = true;
    }  
    
    else if(element.length > MAX_LENGTH_HASHTAG) {
      hashtag.setCustomValidity(`Максимальная длина хэштега  ${MAX_LENGTH_HASHTAG} символов. Удалите лишние.`);
      buttonSubmit.disabled = true;
    } else if (hashtagValue.length > QUANTITY) {
      hashtag.setCustomValidity(`Разрешается только  ${QUANTITY} хэштегов. Удалите лишние.`);
      buttonSubmit.disabled = true;

    } else {
      hashtag.setCustomValidity('');
      buttonSubmit.disabled = false;
    }
    hashtag.reportValidity();

  });
}

  //форматирование введеных хэштегов и проверка и удаление дублей
const validateForm = () => {
  const strValue = hashtag.value;
  const arrValue = strValue.split('#');
  if(arrValue[0] === '') {
    arrValue.shift();
  }
  while(arrValue.length > 5) {
    arrValue.pop();
  }
 
  //проверяем на дубли и если такие встречаются сразу удаляем с помощью обьекта set, который затем преобразуем в массив с помощью array.from
  const arrSort = Array.from(new Set(arrValue));
  //преобразуем массив в строку. Расставляем пробелы и #
  let stringhashtag = arrSort.join(' #');
  stringhashtag = `#${stringhashtag}`;
};

  //проверка поля комментария
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

hashtag.addEventListener('input', verificationHashtag);
comment.addEventListener('input', checkInputComment);
formSubmit.addEventListener('submit', validateForm);
comment.addEventListener('keydown',clearInputs);
hashtag.addEventListener('keydown', clearInputs);
