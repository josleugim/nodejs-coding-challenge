'use strict';
const userCtrl = require('../../controllers/UserCtrl');

module.exports = (app) => {
    app.post('/api/v1/user', userCtrl.post);
};