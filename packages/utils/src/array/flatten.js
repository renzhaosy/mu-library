const INFINITY = 1 / 0

function flatten(array, depth = INFINITY) {
  let result = [];
  if (!Array.isArray(array) || array == null || depth < 0) return result;

  for (const value of array) {
    if (depth > 0 && Array.isArray(value)) {
      result.push(...flatten(value, depth - 1));
    } else {
      result.push(value);
    }
  }

  return result;
}

// export default flatten;

/**
 *
 *
 * @param {*} array  
 * @returns [[type]] array  
 * 
 * example [1, [2,4], [5,6,[7]]] => [1, 2, 4, 5, 6, 7]
 */
function flatten2(array) {
  return  [].concat(...array.map(item => Array.isArray(item) ? flatten2(item) : item));
}

// export default flatten2;
export default flatten2;

