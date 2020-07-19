function objectChild2Array(array, key = 'child', isDelete = false) {
  if (!array || !array.length) return [];
  let result = [];
  result = array.map(function (item) {
    const itemList = []
    if (item[key] && Array.isArray(item[key]) && item[key].length) {
      itemList.push(objectChild2Array(item[key]))
      isDelete && delete item[key]
    }
    itemList.unshift(item)
    return itemList
  })
  return result
}

export default objectChild2Array;