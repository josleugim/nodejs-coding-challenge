'use strict';
const userCtrl = require('../../controllers/UserCtrl');

/**
 * Endpoint to the users
 * @param app
 */
module.exports = (app) => {
    app.post('/api/v1/user', userCtrl.post);
};