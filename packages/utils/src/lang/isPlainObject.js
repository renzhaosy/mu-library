/**
 * 判断一个对象是不是纯粹对象（plain object）
 * 
 * @export
 * @param {*} obj
 * @returns
 */
function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;

  // 一直获取到obj原型链最后一个原型对象， 普通对象的原型即  Object.prototype
  // 为了避免边界情况，比如作用于不同导致直接判断  Object.getPrototypeOf(obj) === Object.prototype 错误
  // 所以直接取obj原型链最后一个的原型对象来判断
  let proto = obj
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }

  return Object.getPrototypeOf(obj) === proto
}

export default isPlainObject;
