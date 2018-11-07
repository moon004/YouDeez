import moment from 'moment';
import 'moment-duration-format';

const unitizer = (value) => {
  const len = value.length;
  let numb;
  switch (true) {
    case (len >= 10):
      numb = Number(value) / 1000000000;
      return `${Math.floor(numb)}B`;
    case (len >= 7):
      numb = Number(value) / 1000000;
      return `${Math.floor(numb)}M`;
    case (len >= 5):
      numb = Number(value) / 1000;
      return `${Math.floor(numb)}K`;
    default:
      return value;
  }
};

export const addDot = (value, limit) => {
  switch (limit) {
    case 116:
      if (value.length >= limit) {
        return `${value.slice(0, limit)}...`;
      }
      break;
    // If channel
    default:
      if (value.length >= limit) {
        return `${value.slice(0, limit)}...`;
      }
  }
  return value;
};

export const timePassed = (value) => {
  const published = value.split('-').map(Number);
  return `${moment().to(published, true)} old`;
};

const convertString = (value) => {
  switch (true) {
    case (value[0] === 'P'):
      return moment.duration(value).format('hh:mm:ss');
    default:
      return unitizer(value);
  }
};

export default convertString;
