const fs = require('fs');

function exist(file) {
  return new Promise((resolve, reject) => {
    fs.stat(file, (error, stat) => {
      if (error) return reject(error.message);
      console.log('in exit ')
      console.log(stat)
      resolve(stat);
    })
  })
}

export default exist;
