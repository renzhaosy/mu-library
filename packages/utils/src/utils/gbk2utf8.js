const fs = require('fs-extra');
const path = require('path');
const iconv  = require('iconv-lite');

const stat = require('../fs/stat');


function readGbk(pathname) {
  return new Promise((resolve, reject) => {
    fs.readFile(pathname, (err, data) => {
      if(!err)  {
        return resolve(iconv.decode(data, 'gbk'));
      }
      reject(`读取 ${pathname} 失败`)
    });
  })
}

async function gbk2utf8({pathname, outPath}) {
  try {
    const data = await readGbk(pathname);
    await fs.writeFile(path.resolve(outPath), data)
  } catch (error) {
    console.log(error)
  }
}

async function init(read, out) {
  let readPath = read;
  let outPath = out;
  if (!readPath) throw new Error('here must has read path');

  try {
    const fileStat = await stat(readPath);

    if (fileStat.isDirectory()) {
      const _outPath = outPath || path.resolve(readPath, 'books');
      const files = fs.readdirSync(readPath, { withFileTypes: true });
      if(files && files.length) {
        fs.ensureDirSync(_outPath)
      }
      const jobs = [];
      files.forEach(fileDirent => {
        if (fileDirent.isFile() && /\.txt$/.test(fileDirent.name)) {
          const filePath = path.resolve(readPath, fileDirent.name);
          const fileOutPath = path.resolve(_outPath, fileDirent.name);

          jobs.push(gbk2utf8({
            pathname: filePath,
            outPath: fileOutPath
          }))
        }
      })

      return jobs.length ? Promise.all(jobs) : true;
    } else if (fileStat.isFile()) {
      console.log('file is file');
      
      // const _outPath = 
      // return gbk2utf8({
      //   pathname: readPath,
      //   outPath: path.resolve(outPath, bookDirent.name)
      // })
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = init;