const fs = require('fs');

function getStat(file) {
  return new Promise((resolve, reject) => {
    fs.stat(file, (error, stat) => {
      if (error) return reject(error.message);
      resolve(stat);
    })
  })
}
module.exports = getStat;