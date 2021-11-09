import {isEscapeKey} from './utils.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const fileChooser = document.querySelector('.img-upload__input');
const previewContainer = document.querySelector('.img-upload__preview');
const preview = previewContainer.querySelector('img');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const hashtag = document.querySelector('.text__hashtags');
const comment = document.querySelector('.text__description');
const buttonClose = document.querySelector('.img-upload__cancel');

const openUploadForm = () => {
  uploadOverlay.classList.toggle('hidden');
  body.classList.add('modal-open');
};

const closeUploadEsc = (evt) => {
  if (isEscapeKey(evt)) {
    uploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    hashtag.textContent = '';
    comment.textContent = '';
  }
};

const closeUploadClick = () => {
  uploadOverlay.classList.toggle('hidden');
  body.classList.remove('modal-open');
  hashtag.textContent = '';
  comment.textContent = '';
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

fileChooser.addEventListener('change',loadNewImage);
buttonClose.addEventListener('click', closeUploadClick);
document.addEventListener('keydown', closeUploadEsc);
