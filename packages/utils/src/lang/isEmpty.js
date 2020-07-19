import getTag from '../utils/getTag';

const hasOwnProperty = Object.prototype.hasOwnProperty;

function isEmpty(value) {
  if (value == null) {
    return true;
  }

  if (Array.isArray(value) || typeof value === 'string') {
    return !value.length;
  }

  const tag = getTag(value);
  if (tag === '[object Map]' || tag === "[object Set]") {
    return !value.size;
  }

  for (let key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }

  return true;
}
