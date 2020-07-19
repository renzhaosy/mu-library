function pick(obj, fileds) {
  const result = {};
  for (let i = 0; i < fileds.length; i++) {
    const key = fileds[i];
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key]
    }
  }
  return result;
}

export default pick;