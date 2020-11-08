const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert } = require('chai');
const server = require('../nodeServer');

chai.should();
chai.use(chaiHttp);

describe('A restaurant', () => {
  const vars = { email: null, token: null };

  beforeEach((done) => {
    vars.email = `${Math.random().toString(36).substring(7)}@test.com`;
    chai.request(server)
      .post('/apiV1/signup/restaurant')
      .send({ name: 'test', email: vars.email, password: 'pwd', location: 'Bangalore' })
      .end((err, res) => {
        assert.equal(res.body.user.email, vars.email);
        assert.equal(res.body.user.location, 'Bangalore');
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

  it('should be able to update profile using PUT /apiV1/profile/restaurant', (done) => {
    chai.request(server)
      .put('/apiV1/profile/restaurant')
      .send({ contactInformation: '999' })
      .set('Authorization', vars.token)
      .end((err, res) => {
        assert.equal(res.body.contactInformation, '999');
        done();
      });
  });

  it('should be able to update profile using PUT /apiV1/dish', (done) => {
    const newDish = {
      description: 'Good',
      dishCategory: 0,
      ingredients: 'Salt',
      name: 'Dish name',
      price: '12',
    };
    chai.request(server)
      .post('/apiV1/dish')
      .send(newDish)
      .set('Authorization', vars.token)
      .end((err, res) => {
        assert.equal(res.body.name, newDish.name);
        done();
      });
  });

});
