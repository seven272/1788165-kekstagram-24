/* eslint-disable no-unused-vars */
/* eslint-disable radix */
const listEffects = {
  chrome: 'effects__preview--chrome',
  sepia: 'effects__preview--sepia',
  marvin: 'effects__preview--marvin',
  phobos: 'effects__preview--phobos',
  heat: 'effects__preview--heat',
  none: 'effects__preview--none',
};

const SCALE_CONTROL_MIN = 25;
const SCALE_CONTROL_MAX = 100;
const SCALE_CONTROL_STEP = 25;
const VALUE_DEFAULT = 1;


const valueControl = document.querySelector('.scale__control--value');
const containerControles = document.querySelector('.scale');
const image = document.querySelector('.img-upload__preview img');
const effects = document.querySelector('.img-upload__effects');
//слайдер
const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');

//меняем масштаб изображения и значение value
const onChangeScale = (evt) => {
  const target = evt.target;

  let value = parseInt(valueControl.value);

  if (target.classList.contains('scale__control--smaller')) {
    if(value > SCALE_CONTROL_MIN) {
      value -= SCALE_CONTROL_STEP;
      valueControl.value = `${value}%`;
      image.style.transform = `scale(0.${value})`;
    }
  } else if (target.classList.contains('scale__control--bigger')) {
    if(value < SCALE_CONTROL_MAX) {
      value += SCALE_CONTROL_STEP;
      valueControl.value = `${value}%`;
      image.style.transform = `scale(0.${value})`;
      if(value === SCALE_CONTROL_MAX) {
        image.style.transform = 'scale(1)';
      }
    }
  }
};

//при клике на миниатюру меняем эффект большой фотографии
const onChangeEffects = (evt) => {
  const target = evt.target;
  switch(target.value) {
    case 'chrome':
      image.className = listEffects.chrome;
      break;
    case 'sepia':
      image.className = listEffects.sepia;
      break;
    case 'marvin':
      image.className = listEffects.marvin;
      break;
    case 'phobos':
      image.className = listEffects.phobos;
      break;
    case 'heat':
      image.className = listEffects.heat;
      break;
    case 'none':
      image.className = listEffects.none;
      break;
  }
};

//слайдер
//Значение по умолчанию
valueElement.value = VALUE_DEFAULT;

//ф-я скрытия слайдера если выбрана миниаютра "оригинал"
const hideSlider = (element) => {
  const effectLevel = document.querySelector('.effect-level');
  if(element.value === 'none') {
    effectLevel.classList.add('hidden');
  } else {
    effectLevel.classList.remove('hidden');
  }
};

//Задаем значение слайдера по умолчанию
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 1,
  connect: 'lower',
});

//меняем насыщенность эффекта по движению ползунка. Также взависимости от выбрононго эффекта меняем стиль элеметна
sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
  valueElement.value = unencoded[handle];

  switch(image.className) {
    case listEffects.chrome:
      image.style.filter = `grayscale(${valueElement.value})`;
      break;
    case listEffects.sepia:
      image.style.filter = `sepia(${valueElement.value})`;
      break;
    case listEffects.marvin:
      image.style.filter = `invert(${valueElement.value}%)`;
      break;
    case listEffects.phobos:
      image.style.filter = `blur(${valueElement.value}px)`;
      break;
    case listEffects.heat:
      image.style.filter = `brightness(${valueElement.value})`;
      break;
    case listEffects.none:
      image.style.filter = 'none';
      break;
  }
});

//меняем значения слайдера при выборе соответсвующей миниатюры
effects.addEventListener('change', (evt) => {
  const target = evt.target;
  switch(target.value) {
    case 'chrome':
    case 'sepia':
    case 'heat':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
      break;

    case 'marvin':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start:100,
        step: 1,
      });
      break;

    case 'phobos':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      break;

    default:
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 10,
        },
        step: 1,
      });
  }
  //вызов ф-й скпытия слайдера
  hideSlider(target);
  // sliderElement.noUiSlider.destroy();
});

const resettingSettingsPicture = () => {
  image.style.filter = 'none';
  image.style.transform = 'scale(1)';
  valueControl.value = SCALE_CONTROL_MAX;
};

//слушатели: масштаб изображения
containerControles.addEventListener('click', onChangeScale);
effects.addEventListener('click', onChangeEffects);

export {resettingSettingsPicture, hideSlider};
