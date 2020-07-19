import getTag from '../utils/getTag';

function isDate(value) {
  return getTag(value) === '[object Date]'
}

export default isDate;