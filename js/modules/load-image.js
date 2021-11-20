import { isEscapeKey } from './utils.js';
// import { hideSlider } from './scale-slider.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const IMG_SRC = 'img/upload-default-image.jpg';
const fileChooser = document.querySelector('.img-upload__input');
const previewContainer = document.querySelector('.img-upload__preview');
const previewImage = previewContainer.querySelector('img');
const preview = previewContainer.querySelector('img');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const hashtag = document.querySelector('.text__hashtags');
const comment = document.querySelector('.text__description');
const buttonClose = document.querySelector('.img-upload__cancel');
const effectNone = document.querySelector('#effect-none');
const sliderElement = document.querySelector('.effect-level');

const openUploadForm = () => {
  uploadOverlay.classList.toggle('hidden');
  body.classList.add('modal-open');
  sliderElement.classList.add('hidden');
};

const closeUploadEsc = (evt) => {
  if (isEscapeKey(evt)) {
    uploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    hashtag.textContent = '';
    comment.textContent = '';
    previewImage.src = IMG_SRC;
    effectNone.checked = true;
    previewImage.style = '';
    previewImage.classList.toggle('effects__preview--none');
  }
};

const closeUploadClick = () => {
  uploadOverlay.classList.toggle('hidden');
  body.classList.remove('modal-open');
  hashtag.textContent = '';
  comment.textContent = '';
  previewImage.src = IMG_SRC;
  previewImage.style = '';
  previewImage.className ='effects__preview--none';
  effectNone.checked = true;
};

const loadNewImage = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
  openUploadForm();
};

fileChooser.addEventListener('change', loadNewImage);
buttonClose.addEventListener('click', closeUploadClick);
document.addEventListener('keydown', closeUploadEsc);
