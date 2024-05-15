const crypto = require('crypto');

const createMD5 = (data) => {
  return crypto.createHash('md5').update(JSON.stringify(data)).digest('hex');
};

const createSHA256 = (data, secret) => {
  return crypto
    .createHash('sha256')
    .update(JSON.stringify(data) + secret)
    .digest('hex');
};

const compareSHA256 = (data, secret, hash) => {
  return createSHA256(data, secret) === hash;
};

module.exports = {
  createMD5,
  createSHA256,
  compareSHA256
};
