'use strick';
// ф-я получениия случайного числа из заданного диапазона, включая мин и мак значения. И заданы параметры по умолчанию.
const getRandomNumber = (min = 0, max = 1) => {
  // eslint-disable-next-line no-alert
  const randomNumber = (min >= 0 && max >= 0 && max > min) ? Math.floor(Math.random() * (max - min + 1)) + min : alert('Укажите корректное значение');
  return randomNumber;
};

getRandomNumber(10, 20);

//ф-я проверки длины комментария: если длина стр меньше 140 - возвращается true, иначе false
const checkingLengthString = (string, maxLength) => string.length <= maxLength;

checkingLengthString('ф-я получениия случайного числа из заданного диапазона, включая мин и мак значения', 140);

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

//ф-я по выбору случайного знаения из переданного массива
const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length-1)];

const createPublickPhoto = () => ({
  id: getRandomNumber(1, 25),
  url: `photos/${getRandomNumber(1, 25)}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomNumber(15, 200),
  comments: {
    id: getRandomNumber(1, 789),
    avatar: `img/avatar${getRandomNumber(1, 6)}.svg`,
    message: getRandomArrayElement(COMMENTS),
    name: getRandomArrayElement(NAMES),
  },
});


const similarPublicPhotos = Array.from({length: SIMILAR_PHOTO_COUNT}, createPublickPhoto);
console.log(similarPublicPhotos);
