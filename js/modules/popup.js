import {isEscapeKey} from './utils.js';
import { dataMiniatures } from '../main.js';
const COMMENTS_QUANTITY = 5;
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img');
const image = bigPictureImg.querySelector('img');
const likes = bigPicture.querySelector('.likes-count');
const buttonClosePopup = bigPicture.querySelector('#picture-cancel');
const body = document.querySelector('body');
const descriptionPicture = bigPicture.querySelector('.social__caption');
const commentsBlock = bigPicture.querySelector('.social__comments');
const commentLoader = bigPicture.querySelector('.comments-loader');
const numberComments = bigPicture.querySelector('.comments-count');
const numberShowComments = bigPicture.querySelector('.comments-count-show');
let count = COMMENTS_QUANTITY;
//выводим изначальное количесвто коментариев при открытии попапа
const countComments = (quantityComments) => {
  if(quantityComments.length < 5) {
    numberShowComments.textContent = `${quantityComments.length}`;
  } else if (quantityComments.length >= 5 ) {
    numberShowComments.textContent = count;
  }
};

const showPopup = (obj) => {
  body.classList.add('modal-open');
  bigPicture.classList.toggle('hidden');
  image.src = obj.url;
  likes.textContent = obj.likes;
  descriptionPicture.textContent = obj.description;
  numberComments.textContent = obj.comments.length;
};

//загружаем новые комментарии при клике
const onClickButtonCommentLoader = (evt) => {
  evt.preventDefault();
  const listAllComments = document.querySelectorAll('.social__comment');
  count += 5;
  for(let i = 0; i < listAllComments.length;i++) {
    if (i < count) {
      listAllComments[i].classList.remove('hidden');
    }
  }
  if(count > listAllComments.length-1) {
    commentLoader.classList.add('hidden');
  }
  //показываем количество коментариев в блоке после клика
  numberShowComments.textContent = count;
  if(count > listAllComments.length) {
    numberShowComments.textContent = listAllComments.length;
  }
};

const showOtherComments = () => {
  const listAllComments = document.querySelectorAll('.social__comment');
  countComments(listAllComments);
  for(let i = 0; i < listAllComments.length;i++) {
    if (i >= COMMENTS_QUANTITY) {
      listAllComments[i].classList.add('hidden');
    }
  }
  commentLoader.addEventListener('click', onClickButtonCommentLoader);
};

const createComments = (listComments) => {
  const fragment = document.createDocumentFragment();
  for(let i = 0; i < listComments.length;i++) {
    const socialComment = document.createElement('li');
    socialComment.classList.add('social__comment');
    const socialImg = document.createElement('img');
    socialImg.classList.add('social__picture');
    socialImg.src = listComments[i].avatar;
    socialImg.alt = listComments[i].name;
    const socialText = document.createElement('p');
    socialText.classList.add('social__text');
    socialText.textContent = listComments[i].message;
    socialComment.appendChild(socialImg);
    socialComment.appendChild(socialText);
    fragment.appendChild(socialComment);
  }
  commentsBlock.appendChild(fragment);
  showOtherComments();

};

const compareId = (evt) => {
  const target = evt.target;
  const parent = target.closest('.picture');
  dataMiniatures.forEach((element)=> {
    if(element.id === Number(parent.dataset.id)) {
      showPopup(element);
      createComments(element.comments);
    }
  });
};

const clickButtonClose = () => {
  bigPicture.classList.toggle('hidden');
  body.classList.remove('modal-open');
  commentsBlock.innerHTML='';
  count = COMMENTS_QUANTITY;
  commentLoader.classList.remove('hidden');
};

const escClose = (evt) => {
  if (isEscapeKey(evt)) {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    commentsBlock.innerHTML='';
    count = COMMENTS_QUANTITY;
    commentLoader.classList.remove('hidden');
  }
};

document.addEventListener('keydown', escClose);
buttonClosePopup.addEventListener('click', clickButtonClose);

export {compareId};
