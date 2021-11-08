// import {similarPublicPhotos} from './data.js';
// import {getRandomNumber} from './utils.js';
import {createPopup} from './popup.js';

//отображение попапа при клике на миниатюру
const clickMiniature = () => {
  const collectionMiniatures = document.querySelectorAll('.picture');

  collectionMiniatures.forEach((miniature) => {
    miniature.addEventListener('click', createPopup);
  });
};

const createMiniatures = (miniatures) => {
  const picturesContainer = document.querySelector('.pictures');
  const template = document.querySelector('#picture').content;
  const pictureTemplate = template.querySelector('.picture');
  const fragment = document.createDocumentFragment();
  miniatures.forEach((photo)=> {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = `${photo.url}`;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    fragment.appendChild(pictureElement);
  });
  picturesContainer.appendChild(fragment);
  clickMiniature();
};

export {createMiniatures};
