'use strict';
const path = require('path');
const rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        db: process.env.DB,
        rootPath: rootPath,
        port: 4000,
        tokenSecret: process.env.TOKEN_SECRET
    }
};