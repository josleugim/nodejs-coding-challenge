'use strict';
const mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: 'The email is required'
    },
    hashed_pwd: {
        type: String,
        required: 'Password (hash) required'
    },
    salt: {
        type: String,
        required: 'Password (salt) required'
    },
});

UserSchema.plugin(timestamps);
module.exports = mongoose.model('User', UserSchema);