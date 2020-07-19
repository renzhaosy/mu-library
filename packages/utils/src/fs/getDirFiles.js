const path = require('path');
const fs = require('fs');

function getDirFilesSync(basePath) {
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
          obj.child = readDirFilesSync(obj.path)
          obj.type = "directory";
        } else {
          obj.type = "file";
        }
        result.push(obj)
      })
    }
    return result
  } catch (error) {
    throw Error(error)
  }
}

export default readDirFiles;