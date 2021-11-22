const LATTICE = '#';
const MIN_LENGTH_HASHTAG = 2;
const MAX_LENGTH_HASHTAG = 20;
const QUANTITY = 5;
const DOUBLE_LATTICE = '##';
const DOUBLE_SPACE = '  ';
const hashtag = document.querySelector('.text__hashtags');
const comment = document.querySelector('.text__description');
const buttonSubmit = document.querySelector('.img-upload__submit');
const regex = /[^#а-яА-ЯёЁa-zA-Z0-9\s]/g;

//выводим сообщения об ошибках в момент ввода пользователем хэштегов
const verificationHashtag = () => {

  hashtag.value = hashtag.value.replace(regex, '').replace(DOUBLE_LATTICE, '').replace(DOUBLE_SPACE,'');

  const hashtagValue = hashtag.value.toLowerCase().trim();
  const hashArray = hashtagValue.split(' ');
  hashArray.forEach((element) => {

    if(element !== '' && element.length < MIN_LENGTH_HASHTAG) {
      hashtag.setCustomValidity('Слишком короткий хэштег. Добавьте символов!');
      buttonSubmit.disabled = true;
    } else if(element[0] !== LATTICE) {
      hashtag.setCustomValidity(`Имя должно начинаться с ${  LATTICE}`);
      buttonSubmit.disabled = true;
    }  else if(element.length > MAX_LENGTH_HASHTAG) {
      hashtag.setCustomValidity(`Максимальная длина хэштега  ${MAX_LENGTH_HASHTAG} символов. Удалите лишние.`);
      buttonSubmit.disabled = true;
    } else if (hashArray.length > QUANTITY) {
      hashtag.setCustomValidity(`Разрешается только  ${QUANTITY} хэштегов. Удалите лишние.`);
      buttonSubmit.disabled = true;

    } else if (element.indexOf('#', 1) !== -1) {
      hashtag.setCustomValidity('Удалите запрещенный символ из хэштега');
      buttonSubmit.disabled = true;

    } else {
      hashtag.setCustomValidity('');
      buttonSubmit.disabled = false;
    }
    hashtag.reportValidity();

  });
  //проверка на дубли
  const isRepeatHashTag = hashArray.some((tag, i, arr) => arr.indexOf(tag, i + 1) >= i + 1);
  if (isRepeatHashTag) {
    hashtag.setCustomValidity('Удалите повторяющиеся хэштеги');
    buttonSubmit.disabled = true;
  }

};

//проверка поля комментария
const checkInputComment = () => {
  const MAX_LENGTH = 140;
  if(comment.value.length > MAX_LENGTH) {
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

};

hashtag.addEventListener('input', verificationHashtag);
comment.addEventListener('input', checkInputComment);
comment.addEventListener('keydown',clearInputs);
hashtag.addEventListener('keydown', clearInputs);
