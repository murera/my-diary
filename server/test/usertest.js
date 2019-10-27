import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { testData } from '../helpers/testData';

chai.use(chaiHttp);
chai.should();
describe('Signup Test', () => {
  it('it should create a user account', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(testData[0])
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('message');
        res.body.should.have.property('message').eql('User created successfully');
        res.body.should.have.property('data');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('email').eql('nyagatare@gmail.com');
        res.body.data.should.not.have.property('password');
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('createdDate');

        done();
      });
  });
});

// no signup if already exist
describe('User sign up ', () => {
  beforeEach('Create a user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(testData[1])
      .end((error, res) => {
        if (error) done(error);
        done();
      });
  });

  it('it should not sign up an already existing a user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(testData[2])
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.have.property('status').eql(409);
        res.body.should.have.property('error');
        res.body.should.have.property('error').eql('User already exist');
      });
    done();
  });

  // login

  describe('User Login ', () => {
    beforeEach('Create a user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(testData[3])
        .end((error) => {
          if (error) done(error);
          done();
        });
    });
    it('it should login a user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(testData[4])
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('message').eql('user successfully logged in');
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('token');
          res.body.data.should.have.property('id');
          res.body.data.should.have.property('firstName').eql('amani');
          res.body.data.should.have.property('lastName').eql('murera');
          res.body.data.should.have.property('email').eql('amani@gmail.com');
          done();
        });
    });
    it('it should not login user without email', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(testData[5])
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          res.body.should.have.property('error').eql('All fields are required');
          done();
        });
    });
    it('it should not login user without password', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(testData[6])
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          res.body.should.have.property('error').eql('All fields are required');
          done();
        });
    });

    // incorrect password
    it('it should not login user with wrong password', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(testData[7])
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property('status').eql(401);
          res.body.should.have.property('error');
          res.body.should.have.property('error').eql('The password is incorrect');
          done();
        });
    });

    // user not found
    it('it should not login user who does not have acount', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(testData[8])
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('status').eql(404);
          res.body.should.have.property('error');
          res.body.should.have.property('error').eql('User Not found');
          done();
        });
    });
  });
});
