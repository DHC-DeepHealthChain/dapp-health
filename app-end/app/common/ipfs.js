import crypto from 'crypto';
import ipfsAPI from 'ipfs-api';
import { Buffer } from 'buffer';

// const Buffer = require('buffer/').Buffer;
/**
 * 解密
 * @param {*} buffer
 * @param {*} password
 */
const decrypt = (buffer, algorithm, password) => {
  const decipher = crypto.createDecipher(algorithm, password);
  const dec = Buffer.concat([decipher.update(buffer), decipher.final()]);
  return dec;
};


const ipfs = ipfsAPI({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' });


/**
 * 根据hash值获取ipfs存储内容
 * @param {*} hash
 */
const getContent = hash => new Promise((resolve, reject) => {
  try {
    ipfs.get(hash, (err, files) => {
      if (err || typeof files === 'undefined') {
        reject(err);
      } else {
        resolve(files[0]);
      }
    });
  } catch (ex) {
    reject(ex);
  }
});

export {
  getContent,
  decrypt,
};