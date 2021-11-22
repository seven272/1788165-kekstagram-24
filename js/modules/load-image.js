import { isEscapeKey } from './utils.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const IMG_SRC = 'img/upload-default-image.jpg';
const Picture = {
  WIDTH: 600,
  HEIGHT: 600,
};
const fileDownload = document.querySelector('.img-upload__input');
//openUploadForm
const sliderElement = document.querySelector('.effect-level');
const body = document.body;
const uploadOverlay = document.querySelector('.img-upload__overlay');
//closeForm
const hashtag = document.querySelector('.text__hashtags');
const comment = document.querySelector('.text__description');
const buttonClose = document.querySelector('.img-upload__cancel');
const effectNone = document.querySelector('#effect-none');
const previewContainer = document.querySelector('.img-upload__preview');
const previewImage = previewContainer.querySelector('img');


const openUploadForm = () => {
  uploadOverlay.classList.toggle('hidden');
  body.classList.add('modal-open');
  sliderElement.classList.add('hidden');
};

const closeForm = () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  hashtag.textContent = '';
  comment.textContent = '';
  previewImage.src = IMG_SRC;
  previewImage.style = '';
  previewImage.className ='effects__preview--none';
  effectNone.checked = true;
};

const onCloseUploadEsc = (evt) => {
  if (isEscapeKey(evt)) {
    closeForm();
  }
};

const onCloseUploadClick = () => {
  closeForm();
};

const onLoadNewImage = () => {
  const imgFile = fileDownload.files[0];
  const imgName = imgFile.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => imgName.endsWith(it));
  if (matches) {
    const reader = new FileReader();
    const onReaderLoad = () => {
      previewImage.src = reader.result;
      previewImage.width = Picture.WIDTH;
      previewImage.height = Picture.HEIGHT;
    };
    reader.addEventListener('load', onReaderLoad);
    reader.readAsDataURL(imgFile);
  }
  openUploadForm();
};

fileDownload.addEventListener('change', onLoadNewImage);
buttonClose.addEventListener('click', onCloseUploadClick);
document.addEventListener('keydown', onCloseUploadEsc);
