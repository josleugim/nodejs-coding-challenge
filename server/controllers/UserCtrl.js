'use strict';
const mongoose = require('mongoose'),
    User = mongoose.model('User'),
    encrypt = require('../services/encrypto');

/**
 * Handles the POST method, to store user data
 * @param req
 * @param res
 */
exports.post = (req, res) => {
    console.log('POST User');
    let data = {};
    if(req.body.email) {
        data.email = req.body.email;
    }

    if(req.body.password) {
        const salt = encrypt.createSalt();
        const hash = encrypt.hashPwd(salt, req.body.password);
        data.salt = salt;
        data.hashed_pwd = hash;
    }

    const user = new User(data);
    const resData = {
        success: true
    };
    user.save((err, result) => {
        if(err) {
            console.error(err);
        }
        if(result) {
            res.status(201).json(resData);
        } else {
            resData.message = 'The user could not be stored to the database';
            resData.success = false;
            res.status(500).json(resData);
        }
    })
};