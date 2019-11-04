import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

import { testData } from '../helpers/testData';
import Database from '../models/database';

const { expect } = chai;
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
