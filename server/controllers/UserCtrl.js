'use strict';
const mongoose = require('mongoose'),
    User = mongoose.model('User'),
    encrypt = require('../services/encrypto'),
    validations = require('../services/validations'),
    jwt = require('jsonwebtoken');

/**
 * Handles the POST method, to store user data
 * @param req
 * @param res
 */
exports.post = (req, res) => {
    console.log('POST User');
    let data = {};
    if(req.body.email && typeof validations.emailFormat(req.body.email)  === 'undefined') {
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

/**
 * Handles the authentication trough the API
 * @param req
 * @param res
 */
exports.auth = (req, res) => {
    console.log('POST Auth');
    const resData = {
        success: true
    };

    const query = {};

    if(req.query.email && typeof validations.emailFormat(req.query.email) === 'undefined' && req.query.password) {
        query.email = req.query.email;
        query.password = req.query.password;

        User
            .findOne({ email: query.email })
            .exec((err, user) => {
                if(err) {
                    console.error('Authentication error: ' + err);
                    resData.success = false;
                    resData.message = 'Access denied';
                    res.status(401).json(resData);
                }
                if(!user) {
                    resData.success = false;
                    resData.message = 'Access denied';
                    res.status(401).json(resData);
                } else if(encrypt.hashPwd(user.salt, query.password) === user.hashed_pwd) {
                    resData.token = jwt.sign({ user_id: user._id}, process.env.TOKEN_SECRET);
                    res.status(200).json(resData);
                }
            });

    } else {
        resData.success = false;
        resData.message = 'Access denied';
        res.status(404).json(resData);
    }
};