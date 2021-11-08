import { dataMiniatures } from '../main.js';
import {createMiniatures} from './miniatures.js';
import {debounce} from '../utils/debounce.js';

const filter = document.querySelector('.img-filters');
//показываем блок с кнопками сортировки после загрузки данных
const showFilter = () => {
  filter.classList.remove('img-filters--inactive');
};


const sortPhotos = (evt) => {
  const target = evt.target;
  const buttonDefault = document.getElementById('filter-default');
  const buttonRandom = document.getElementById('filter-random');
  const buttonDiscussed = document.getElementById('filter-discussed');
  const picturesContainer = document.querySelector('.pictures');
  const miniatures = picturesContainer.querySelectorAll('.picture');
  //меняем стиль у выбранной кнопки
  const changeStyleButton = (button) => {
    const buttons = document.querySelectorAll('.img-filters__button');
    buttons.forEach((elem)=> {
      elem.classList.remove('img-filters__button--active');
    });
    button.classList.add('img-filters__button--active');

  };

  //сортируем миниатюры
  if (target === buttonRandom ) {
    const arrayCopy = dataMiniatures.slice();
    const arrRandomTenPhotos = arrayCopy.sort(()=> 0.5 - Math.random()).slice(0, 10);
    miniatures.forEach((miniature) => {
      miniature.remove();
    });
    createMiniatures(arrRandomTenPhotos);
    changeStyleButton(target);

  } else if (target === buttonDiscussed) {
    const arrayCopy = dataMiniatures.slice();
    const arrPhotoComments = arrayCopy.sort((a,b)=> b.comments.length - a.comments.length);
    miniatures.forEach((miniature) => {
      miniature.remove();
    });
    createMiniatures(arrPhotoComments);
    changeStyleButton(target);

  } else if (target === buttonDefault) {
    miniatures.forEach((miniature) => {
      miniature.remove();
    });
    createMiniatures(dataMiniatures);
    changeStyleButton(target);
  }

};

filter.addEventListener('click',debounce(sortPhotos));
export {showFilter};
