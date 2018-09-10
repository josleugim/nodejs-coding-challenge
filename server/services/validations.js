'use strict';

const validate = require('validate.js'),
    jwt = require('jsonwebtoken');

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

/**
 * Validates the signature of the token received
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.validateJWT = function(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
            if (err) {
                console.error(err);
                res.status(401).json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                next();
            }
        });

    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided'
        });

    }
};