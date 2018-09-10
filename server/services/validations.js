'use strict';

const validate = require('validate.js');

exports.emailFormat = email => {
    const constraints = {
        from: {
            email: true
        }
    };

    return validate({ from: email }, constraints);
};