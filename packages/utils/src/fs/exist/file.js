const path = require('path');

async function isFileExixt(file) {
  return new Promise((resolve, reject) => {
    fs.access(file, error => {
      if (error) return reject(error.message);
      resolve(true)
    })
  })
}