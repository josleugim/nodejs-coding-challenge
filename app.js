'use strict';

const express = require('express'),
    dotenv = require('dotenv').config();
let env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const app = express();
const config = require('./server/config/configuration')[env];
require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);

require('./server/routes/v1/user')(app, config);

require('./server/routes/v1/auth')(app, config);

require('./server/routes/v1/hello')(app, config);

app.listen(config.port, function () {
    console.log('Gulp is running the API on PORT: ' + config.port);
});

/**
 * Export the Express app so that it can be used by Chai
 * ¡Important: Only for development, comment line in other environment!
 */
module.exports = app;