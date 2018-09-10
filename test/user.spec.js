'use strict';

const chai = require('chai');
const expect = require('chai').expect,
    assert = require('assert');
const User = require('../server/models/User'),
    validations = require('../server/services/validations');

describe('User validations', () => {
    after(function() {
        process.exit();
    });

    before(function () {

    });

    it('should be invalid if email is empty', done => {
        const user = new User();
        user.validate(function (err) {
            expect(err.errors.email).to.exist;
            done();
        })
    });

    it('should be invalid if password is empty', done => {
        const user = new User();
        user.validate(function (err) {
            expect(err.errors.hashed_pwd).to.exist;
            done();
        })
    });

    it('should be a valid format', done => {
        const isValid = validations.emailFormat('josleugim@gmail.com');
        assert(typeof isValid === 'undefined');
        done();
    });

    it('should be a invalid format', done => {
        const isValid = validations.emailFormat('josleugim@gmail');
        expect(isValid.from).to.exist;
        done();
    })
});