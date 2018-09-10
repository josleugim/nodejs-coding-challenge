'use strict';
const path = require('path'),
    validations = require('../../services/validations');

/**
 * Route for the hello endpoint
 * @param app
 * @param config
 */
module.exports = (app, config) => {
    app.get('/hello', validations.validateJWT, (req, res) => {
        res.status(200).json({ hello: 'world' })
    });
};