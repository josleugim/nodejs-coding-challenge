'use strict';
const chai = require('chai');
const expect = require('chai').expect;
const app = require('../app');
chai.use(require('chai-http'));


describe('API Authentication endpoint /auth', () => {
    after(function() {

    });
    it('should denied access', () => {
        return chai.request(app)
            .post('/api/v1/auth?email=demo@demo.com&password=mypass')
            .send({})
            .then(function(res) {
                expect(res).to.have.status(401);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object').that.include({success: false});
            });
    });

});