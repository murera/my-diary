import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

import { testData } from '../helpers/testData';
import Database from '../models/database';

chai.use(chaiHttp);
chai.should();


describe('test for database', () => {
  before('Clear data from database', (done) => {
    chai.request(app);
    Database.execute('DELETE FROM users');
    done();
	  });
	  it('it should create a user account', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(testData[0])
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('data');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('firstname').eql('Manzi');
        res.body.data.should.have.property('lastname').eql('miguel');
        res.body.data.should.not.have.property('password');
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('createdon');

        done();
      });
  });
  it('it should not create a user account if firstname is empty is empty', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(testData[10])
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });
  it('it should not create a user account if all all field are empty', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(testData[1])
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });
});

describe('User sign up ', () => {
  beforeEach('Create a user', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(testData[2])
      .end((error, res) => {
        if (error) done(error);
        done();
      });
  });
  it('it should not sign up an already existing a user', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(testData[3])
      .end((err, res) => {
        res.body.should.have.property('status').eql(409);
        res.body.should.have.property('error');
        res.body.should.have.property('error').eql('Email is already taken!');
      });
    done();
  });
});

describe('User Login ', () => {
  beforeEach('Create a user', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(testData[4])
      .end((error) => {
        if (error) done(error);
        done();
      });
  });
  it('it should login a user', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signin')
      .send(testData[5])
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('data');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('token');
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('firstname').eql('amani');
        res.body.data.should.have.property('lastname').eql('murera');
        done();
      });
  });
  it('it should not login user without email', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signin')
      .send(testData[6])
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });
  it('it should not login user without password', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signin')
      .send(testData[7])
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });

  // incorrect password
  it('it should not login user with wrong password', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signin')
      .send(testData[8])
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('error');
        res.body.should.have.property('error').eql('email or password is incorrect!');
        done();
      });
  });


  // user not found
  it('it should not login user who does not have acount', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signin')
      .send(testData[9])
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('status').eql(401);
        res.body.should.have.property('error');
        res.body.should.have.property('error').eql('email or password is incorrect!');
        done();
      });
  });
});


describe('POST api/v2/auth/signup when endpoint does not exist', () => {
  it('should return incorrect route', (done) => {
    chai.request(app)
      .post('/api/v2')
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.an('object');
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error');
        res.body.should.have.property('error').eql('Incorrect route!');
        done();
      });
  });
});
describe('POST api/v2/auth/signup when JSON format is incorrect', () => {
  it('should return incorrect JSON format', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send('{"invalidJson"}')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        res.body.should.have.property('error').eql('invalid JSON format!');
        done();
      });
  });
});
