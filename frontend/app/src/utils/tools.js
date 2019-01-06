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

export const truncate = (value, limit) => {
  if (value.length >= limit) {
    return `${value.slice(0, limit)}`;
  }
  return value;
};

export const timePassed = (value) => {
  const pub = value.split('-').map(Number);
  //                     Due to month start with 0
  return `${moment().to([pub[0], pub[1] - 1, pub[2]], true)} old`;
};

export const convertString = (value) => {
  switch (true) {
    case (/^PT\w*/.test(value)):
      if (/^PT\d*S$/.test(value)) {
        return `0:${moment.duration(value).format('hh:mm:ss')}`;
      }
      if (/^PT\dH\d*M\d*S$|^PT\dM\d*S$/.test(value)) {
        return moment.duration(value).format('hh:mm:ss').substring(1);
      }
      return moment.duration(value).format('hh:mm:ss');
    case (typeof value === 'number'): // for deezer
      if (value < 60) {
        return `0:${moment.duration(value, 'seconds').format('hh:mm:ss')}`;
      }
      return moment.duration(value, 'seconds').format('h:m:ss');
    default:
      if (value !== undefined) {
        return unitizer(value);
      }
      return '0:00';
  }
};


export const dupChecker = (array, itemToCheck) => {
  const duplicated = array.some(function (elem) {
    return elem === this;
  }, itemToCheck);
  if (duplicated) {
    return array;
  }
  array.push(itemToCheck);
  return array;
};
