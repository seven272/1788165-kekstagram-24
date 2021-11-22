import { dataMiniatures } from '../main.js';
import {createMiniatures} from './miniatures.js';
import {debounce} from './utils/debounce.js';

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
  let arrayCopyMiniatures = [];
  //меняем стиль у выбранной кнопки
  const changeStyleButton = (button) => {
    const buttons = document.querySelectorAll('.img-filters__button');
    buttons.forEach((elem)=> {
      elem.classList.remove('img-filters__button--active');
    });
    button.classList.add('img-filters__button--active');

  };

  const copyArray = () => {
    arrayCopyMiniatures = dataMiniatures.slice();
  };
  const removeMiniatures = () => {
    miniatures.forEach((miniature) => {
      miniature.remove();
    });
  };

  //сортируем миниатюры
  if (target === buttonRandom ) {
    copyArray();
    const arrRandomTenPhotos = arrayCopyMiniatures.sort(()=> 0.5 - Math.random()).slice(0, 10);
    removeMiniatures();
    createMiniatures(arrRandomTenPhotos);
    changeStyleButton(target);

  } else if (target === buttonDiscussed) {
    copyArray();
    const arrPhotoComments = arrayCopyMiniatures.sort((a,b)=> b.comments.length - a.comments.length);
    removeMiniatures();
    createMiniatures(arrPhotoComments);
    changeStyleButton(target);

  } else if (target === buttonDefault) {
    removeMiniatures();
    createMiniatures(dataMiniatures);
    changeStyleButton(target);
  }

};

filter.addEventListener('click',debounce(sortPhotos));
export {showFilter};
