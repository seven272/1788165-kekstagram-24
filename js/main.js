import './modules/data.js';
import './modules/miniatures.js';
import './modules/form.js';
import './modules/scale-slider.js';

import {createMiniatures} from './modules/miniatures.js';
import {showAlert} from './modules/utils.js';


fetch('https://24.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((photos) => {
    createMiniatures(photos);
    console.log(photos);
  })
  .catch(() => {
    showAlert('Не удалось загрузить данные. Попробуйте еще раз!');
  });

