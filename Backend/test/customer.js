const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert } = require('chai');
const server = require('../nodeServer');

chai.should();
chai.use(chaiHttp);

describe('A customer', () => {
  const vars = { email: null, token: null };

  beforeEach((done) => {
    vars.email = `${Math.random().toString(36).substring(7)}@test.com`;
    chai.request(server)
      .post('/apiV1/signup/customer')
      .send({ name: 'test', email: vars.email, password: 'pwd' })
      .end((err, res) => {
        assert.equal(res.body.user.email, vars.email);
        vars.token = res.body.token;
        done();
      });
  });

  it('should be able to show current user when logged in using GET /apiV1/currentUser', (done) => {
    chai.request(server)
      .get('/apiV1/currentUser')
      .set('Authorization', vars.token)
      .end((err, res) => {
        assert.equal(res.body.user.email, vars.email);
        done();
      });
  });

  it('should be able to update profile using PUT /apiV1/profile/customer', (done) => {
    chai.request(server)
      .put('/apiV1/profile/customer')
      .send({ about: 'About me' })
      .set('Authorization', vars.token)
      .end((err, res) => {
        assert.equal(res.body.about, 'About me');
        done();
      });
  });

  it('should be able to get profile using GET /apiV1/currentUser', (done) => {
    chai.request(server)
      .get('/apiV1/currentUser')
      .set('Authorization', vars.token)
      .end((err, res) => {
        assert.equal(res.body.user.email, vars.email);
        done();
      });
  });

  it('should be able to list all my orders using GET /apiV1/myOrders', (done) => {
    chai.request(server)
      .get('/apiV1/myOrders')
      .set('Authorization', vars.token)
      .end((err, res) => {
        assert.equal(res.body.length, 0);
        done();
      });
  });

  it('should not be able to access my orders without logging in GET /apiV1/myOrders', (done) => {
    chai.request(server)
      .get('/apiV1/myOrders')
      .end((err, res) => {
        assert.equal(res.body.err, 'You need to login.');
        done();
      });
  });

  it('should not be able to access my orders with wrong authorization token in GET /apiV1/myOrders', (done) => {
    chai.request(server)
      .get('/apiV1/myOrders')
      .set('Authorization', `${vars.token}wrong`)
      .end((err, res) => {
        assert.equal(res.body.err, 'You need to login, your session has expired');
        done();
      });
  });
});
