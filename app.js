'use strict';

const express = require('express'),
    dotenv = require('dotenv').config();
let env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const app = express();
const config = require('./server/config/configuration')[env];

require('./server/routes/v1/home')(app, config);

app.listen(config.port, function () {
    console.log('Gulp is running the API on PORT: ' + config.port);
});