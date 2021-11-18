import './modules/miniatures.js';
import './modules/form.js';
import './modules/scale-slider.js';
import './modules/filter.js';
import './modules/load-image.js';
import './modules/validate-form.js';

import {createMiniatures} from './modules/miniatures.js';
import {showAlert} from './modules/utils.js';
import {showFilter} from './modules/filter.js';
let dataMiniatures =[];

fetch('https://24.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((photos) => {
    createMiniatures(photos);
    dataMiniatures = photos.slice();
    showFilter();
  })
  .catch(() => {
    showAlert('Не удалось загрузить данные. Попробуйте еще раз!');
  });

export {dataMiniatures};
