import crypto = require('crypto');

export function setFileName (req,file,cb) {
    const [name,format] = file.originalname.split(".");
    const hash = crypto.createHash('md5').update(name+ new Date().toISOString()).digest('hex');
    cb(null, `${hash}.${format}`);
}

export function fileFilter (req,{size},cb) {
    if(size > 1024 * 1024) {
        cb(null, false)
      }
    cb(null, true)
}