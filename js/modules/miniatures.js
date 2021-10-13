import {similarPublicPhotos} from './data.js';
import {getRandomNumber} from './utils.js';

const picturesContainer = document.querySelector('.pictures');
const template = document.querySelector('#picture').content;
const pictureTemplate = template.querySelector('.picture');
const fragment = document.createDocumentFragment();

similarPublicPhotos.forEach((photo)=> {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = `${photo.url}`;
  pictureElement.querySelector('.picture__likes').textContent = photo['likes'];
  pictureElement.querySelector('.picture__comments').textContent = getRandomNumber(0, 40);
  fragment.appendChild(pictureElement);
});

picturesContainer.appendChild(fragment);
