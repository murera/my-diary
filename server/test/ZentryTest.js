/* eslint-disable import/no-extraneous-dependencies */

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { testData, invalidToken, unExistedToken } from '../helpers/testData';
import Database from '../models/database';

chai.use(chaiHttp);
chai.should();
describe('Entry creation', () => {
  describe('entries', () => {
    let token;
    let token2;
    let ownerId;
    let propertyId;
    it('user should create a user account', (done) => {
      chai.request(app)
        .post('/api/v2/auth/signup')
        .send(testData[11])
        .end((err, res) => {
          ownerId = res.body.data.id;
          token = res.body.data.token;
          res.should.have.status(201);
          res.body.should.have.property('status').eql(201);
          res.body.should.have.property('data');
          res.body.data.should.have.property('firstname').eql('Nyagatare');
          res.body.data.should.have.property('lastname').eql('James');
          res.body.data.should.not.have.property('password');
          res.body.data.should.have.property('id');
          res.body.data.should.have.property('createdon');
          done();
        });
    });
    console.log(token);
    it('user should create a user account', (done) => {
      chai.request(app)
        .post('/api/v2/auth/signup')
        .send(testData[12])
        .end((err, res) => {
          ownerId = res.body.data.id;
          token2 = res.body.data.token;
          res.should.have.status(201);
          res.body.should.have.property('status').eql(201);
          res.body.should.have.property('data');
          res.body.data.should.have.property('firstname').eql('umuhoza');
          res.body.data.should.have.property('lastname').eql('rosine');
          res.body.data.should.not.have.property('password');
          res.body.data.should.have.property('id');
          res.body.data.should.have.property('createdon');

          done();
        });
    });

    it('it should create an entry', (done) => {
      chai.request(app)
        .post('/api/v2/entries')
       .set('Accept', 'application/json')
      .set('authorization', token)
        .send(testData[13])
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('status').eql(201);
          done();
        });
    });
    it('it should not create an entry if title is empty', (done) => {
      chai.request(app)
        .post('/api/v2/entries')
        .set('Accept', 'application/json')
      .set('authorization', token)
        .send(testData[14])
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          res.body.should.have.property('status').eql(400);
          done();
        });
    });
    it('it should not create an entry if description is empty', (done) => {
      chai.request(app)
        .post('/api/v2/entries')
        .set('Accept', 'application/json')
         .set('authorization', token)
        .send(testData[15])
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          res.body.should.have.property('status').eql(400);
          done();
        });
    });
    it('it should not create an entry if description and title are empty', (done) => {
      chai.request(app)
        .post('/api/v2/entries')
        .set('Accept', 'application/json')
         .set('authorization', token)
        .send(testData[16])
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          res.body.should.have.property('status').eql(400);
          done();
        });
    });
    it('it should not create an entry if either description or title is a number', (done) => {
        chai.request(app)
          .post('/api/v2/entries')
          .set('Accept', 'application/json')
           .set('authorization', token)
          .send(testData[17])
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('status');
            res.body.should.have.property('error');
            res.body.should.have.property('status').eql(400);
            res.body.should.have.property('error').eql('"title" must be a string');
            done();
          });
      });
      it('it should not create an entry if token is not providen', (done) => {
        const data = {
          title: 'a brand new entry without token',
          description: 'my firt entry',
          
        };
        chai.request(app)
          .post('/api/v2/entries')
          .set('authorization', '')
          .send(data)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property('status');
            res.body.should.have.property('status').eql(401);
            res.body.should.have.property('error');
            res.body.should.have.property('error').eql('No access token found!');
            done();
          });
          });

          it('it should not create an entry if token is invalid', (done) => {
			const data = {
				title: 'a brand new entry with invalid token',
				description: 'my firt entry',
				
			};
			chai.request(app)
				.post('/api/v2/entries')
        .set('authorization', invalidToken)
				.send(data)
				.end((err, res) => {
					res.should.have.status(400);
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error');
          res.body.should.have.property('error').eql('jwt malformed');
                    
					done();
				});
        });
        it('it should not create an entry if user does not exist', (done) => {
          const data = {
            title: 'a brand new entry un existed user',
            description: 'my firt entry',
            
          };
          chai.request(app)
            .post('/api/v2/entries')
            .set('authorization', unExistedToken)
            .send(data)
            .end((err, res) => {
                        res.should.have.status(401);
                        res.body.should.have.property('status');
              res.body.should.have.property('status').eql(401);
                        res.body.should.have.property('error');
                        res.body.should.have.property('error').eql('Such kind of access token does not match any user!');
              done();
            });
            });
    
    
  
  });

});

