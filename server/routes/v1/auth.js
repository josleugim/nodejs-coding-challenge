'use strict';

const userCtrl = require('../../controllers/UserCtrl'),
    jwt = require('jsonwebtoken');

module.exports = (app) => {
    app.post('/api/v1/auth', userCtrl.auth);
};