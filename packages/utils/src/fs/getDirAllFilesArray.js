const path = require('path');
const fs = require('fs');

function getDirAllFilesArray(basePath) {
  try {
    const filesList = fs.readdirSync(basePath, {
      withFileTypes: true,
    });

    const result = []
    if (filesList && filesList.length) {
      filesList.forEach(item => {
        if (ignoreFile.includes(item.name)) return;
        const obj = {
          name: item.name,
          path: path.resolve(basePath, item.name),
          parent: basePath,
        };
        if (item.isDirectory()) {
          result.push(...readDirFilesSync(obj.path))
        } else {
          result.push(obj)
        }
      })
    }
    return result
  } catch (error) {
    throw Error(error)
  }
}

export default getDirAllFilesArray;