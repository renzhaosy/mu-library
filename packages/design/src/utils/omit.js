function omit(obj, fields) {
  const copyObj = {...obj};
  for (let i = 0; i < fields.length; i++) {
    const key = fields[i];
    delete copyObj[key];
  }
  return copyObj;
}

export default omit;