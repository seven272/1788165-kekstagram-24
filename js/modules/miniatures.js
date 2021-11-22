import {onCompareId} from './popup.js';

//отображение попапа при клике на миниатюру
const clickMiniature = () => {
  const collectionMiniatures = document.querySelectorAll('.picture');
  collectionMiniatures.forEach((miniature) => {
    miniature.addEventListener('click', onCompareId);
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
    //создаем дата-атрибуты для записи описания изображения
    pictureElement.setAttribute('data-description', photo.description);
    pictureElement.setAttribute('data-id', photo.id);
    fragment.appendChild(pictureElement);
  });
  picturesContainer.appendChild(fragment);
  clickMiniature();
};

export {createMiniatures};
