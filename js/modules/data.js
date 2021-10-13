'use strick';
import {getRandomNumber, getRandomId} from './utils.js';

//урок 4.9. Больше деталей

const NAMES = ['Иван', 'Лена', 'Глеб', 'Ольга', 'Виктор', 'Анна', 'Михаил'];

const DESCRIPTIONS = [
  'Живописный пейзаж хвойного леса',
  'Осень в Греции',
  'Вид на Букингемский дворец',
  'Красная площадь',
  'Итальянский ресторанчик на Сардинии',
  'Сочи 9 октября 2021 года',
];
const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const SIMILAR_PHOTO_COUNT = 4;
const RANDOM_ID = getRandomId(1,25);
const RANDOM_COMMENT_ID = getRandomId(1,100);

//ф-я по выбору случайного знаения из переданного массива
const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length-1)];

const createPublickPhoto = () => ({
  id: RANDOM_ID(),
  url: `photos/${RANDOM_ID(1, 25)}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomNumber(15, 200),
  comments: {
    id: RANDOM_COMMENT_ID(),
    avatar: `img/avatar${getRandomNumber(1, 6)}.svg`,
    message: getRandomArrayElement(COMMENTS),
    name: getRandomArrayElement(NAMES),
  },
});


const similarPublicPhotos = Array.from({length: SIMILAR_PHOTO_COUNT}, createPublickPhoto);
// eslint-disable-next-line no-console
console.log(similarPublicPhotos);

export{similarPublicPhotos};

