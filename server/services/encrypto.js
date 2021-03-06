'use strict';
const crypto = require('crypto');

exports.createSalt =  () => {
    return crypto.randomBytes(128).toString('base64');
};

exports.hashPwd = (salt, pwd) => {
    const hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd).digest('hex');
};