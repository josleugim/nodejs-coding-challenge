'use strict';

const chai = require('chai');
const expect = require('chai').expect;
const User = require('../server/models/User');

describe('User validations', () => {
    after(function() {
        //process.exit();
    });

    before(function () {

    });

    it('should be invalid if email is empty', function (done) {
        const user = new User();
        user.validate(function (err) {
            expect(err.errors.email).to.exist;
            done();
        })
    });

    it('should be invalid if password is empty', function (done) {
        const user = new User();
        user.validate(function (err) {
            expect(err.errors.hashed_pwd).to.exist;
            done();
        })
    });
});