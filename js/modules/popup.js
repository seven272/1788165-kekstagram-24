import {popupBigPhoto} from './data.js';
import {getRandomNumber, isEscapeKey} from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img');
const image = bigPictureImg.querySelector('img');
const likes = bigPicture.querySelector('.likes-count');
const numberComments = bigPicture.querySelector('.comments-count');
const commentsBlock = bigPicture.querySelector('.social__comments');
const descriptionPicture = bigPicture.querySelector('.social__caption');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentLoader = bigPicture.querySelector('.comments-loader');
const buttonClosePopup = bigPicture.querySelector('#picture-cancel');
const body =document.querySelector('body');
const fragment = document.createDocumentFragment();

const createPopup = () => {
  body.classList.add('modal-open');
  bigPicture.classList.toggle('hidden');
  image.src = `photos/${getRandomNumber(1,25)}.jpg`;
  likes.textContent = popupBigPhoto[0].likes;
  numberComments.textContent = getRandomNumber(10, 240);
  descriptionPicture.textContent = popupBigPhoto[0].description;
  for(let i = 0; i < 2;i++) {
    const socialComment = document.createElement('li');
    socialComment.classList.add('social__comment');
    const socialImg = document.createElement('img');
    socialImg.classList.add('social__picture');
    socialImg.src = popupBigPhoto[0].comments.avatar;
    socialImg.alt = popupBigPhoto[0].comments.name;
    const socialText = document.createElement('p');
    socialText.classList.add('social__text');
    socialText.textContent = popupBigPhoto[0].comments.message;
    socialComment.appendChild(socialImg);
    socialComment.appendChild(socialText);
    fragment.appendChild(socialComment);
  }
  commentsBlock.appendChild(fragment);
  if(bigPicture.classList.contains('hidden') === false) {
    commentCount.classList.add('hidden');
    commentLoader.classList.add('hidden');
  }
};

// createPopup();

buttonClosePopup.addEventListener('click', () => {
  bigPicture.classList.toggle('hidden');
  body.classList.remove('modal-open');
});

const escClose = (evt) => {
  if (isEscapeKey(evt)) {
    bigPicture.classList.toggle('hidden');
    body.classList.remove('modal-open');
  }
};
document.addEventListener('keydown', escClose);

export {createPopup};
