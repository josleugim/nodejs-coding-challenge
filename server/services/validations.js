'use strict';

const validate = require('validate.js');

/**
 * Validates that the email received has a correct format
 * @param email
 * @returns {any}
 */
exports.emailFormat = email => {
    const constraints = {
        from: {
            email: true
        }
    };

    return validate({ from: email }, constraints);
};