
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { testData , invalidToken, unExistedToken } from '../helpers/testData';

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
        .post('/api/v1/auth/signup')
        .send(testData[9])
        .end((err, res) => {
          ownerId = res.body.data.id;
          token = res.body.data.token;
          res.should.have.status(201);
          res.body.should.have.property('status').eql(201);
          res.body.should.have.property('data');
          res.body.data.should.have.property('firstName').eql('Nyagatare');
          res.body.data.should.have.property('lastName').eql('James');
          res.body.data.should.have.property('email').eql('nyatare@gmail.com');
          res.body.data.should.not.have.property('password');
          res.body.data.should.have.property('id');
          res.body.data.should.have.property('createdDate');
          done();
        });
    });
    it('user should create a user account', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(testData[10])
        .end((err, res) => {
          ownerId = res.body.data.id;
          token2 = res.body.data.token;
          res.should.have.status(201);
          res.body.should.have.property('status').eql(201);
          res.body.should.have.property('data');
          res.body.data.should.have.property('firstName').eql('Nyagatare');
          res.body.data.should.have.property('lastName').eql('James');
          res.body.data.should.have.property('email').eql('kigali@gmail.com');
          res.body.data.should.not.have.property('password');
          res.body.data.should.have.property('id');
          res.body.data.should.have.property('createdDate');

          done();
        });
    });

    it('it should create an entry', (done) => {
      chai.request(app)
        .post('/api/v1/entries')
        .set('Authorization', `Bearer ${token}`)
        .send(testData[11])
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('status').eql(201);
          done();
        });
    });
    it('it should not create an entry if title is empty', (done) => {
      chai.request(app)
        .post('/api/v1/entries')
        .set('Authorization', `Bearer ${token}`)
        .send(testData[12])
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
        .post('/api/v1/entries')
        .set('Authorization', `Bearer ${token}`)
        .send(testData[13])
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
        .post('/api/v1/entries')
        .set('Authorization', `Bearer ${token}`)
        .send(testData[14])
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          res.body.should.have.property('status').eql(400);
          done();
        });
    });
    // user edit delete and update his entries
    describe('user can alter his entries', () => {
      beforeEach('create an entry', (done) => {
        chai.request(app)
          .post('/api/v1/entries')
          .set('Authorization', `Bearer ${token}`)
          .send(testData[15])
          .end((err, res) => {
            propertyId = res.body.data.id;
            res.should.have.status(201);
            res.body.should.have.property('status').eql(201);
            done();
          });
      });
      it('user can edit an entry', (done) => {
        chai.request(app)
          .patch(`/api/v1/entries/${propertyId}`)
          .set('Authorization', `Bearer ${token}`)
          .send(testData[16])
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('data');
            res.body.data.should.have.property('description').eql('edited description');
            res.body.data.should.have.property('title').eql('an edited title');
            res.body.should.have.property('status').eql(200);
            res.body.should.have.property('message').eql('entry successfully edited');
            done();
          });
      });


      it('user can not delete a non existing entry', (done) => {
        chai.request(app)
          .delete('/api/v1/entries/0')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.have.property('error');
            res.body.should.have.property('error').eql('Entry Not found');
            res.body.should.have.property('status').eql(404);
            done();
          });
      });
      it('user can not delete an entry which he does not own ', (done) => {
        chai.request(app)
          .delete(`/api/v1/entries/${propertyId}`)
          .set('Authorization', `Bearer ${token2}`)
          .end((err, res) => {
            res.should.have.status(403);
            res.body.should.have.property('error');
            res.body.should.have.property('error').eql('Forbidden');
            res.body.should.have.property('status').eql(403);
            done();
          });
      });
      it('user can not update an entry which he does not own ', (done) => {
        chai.request(app)
          .patch(`/api/v1/entries/${propertyId}`)
          .set('Authorization', `Bearer ${token2}`)
          .end((err, res) => {
            res.should.have.status(403);
            res.body.should.have.property('error');
            res.body.should.have.property('error').eql('Forbidden');
            res.body.should.have.property('status').eql(403);
            done();
          });
      });

      it('user can not update a non existing entry', (done) => {
        chai.request(app)
          .patch('/api/v1/entries/0')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.have.property('error');
            res.body.should.have.property('error').eql('Entry Not found');
            res.body.should.have.property('status').eql(404);
            done();
          });
      });
      it('user can get all entries ', (done) => {
        chai.request(app)
          .get('/api/v1/entries')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message');
            res.body.should.have.property('message').eql('all entries retrived successfully');
            res.body.should.have.property('data');
            res.body.data.should.be.a('array');

            done();
          });
      });
      it('user can not get entry if his dairy is empty ', (done) => {
        chai.request(app)
          .get('/api/v1/entries')
          .set('Authorization', `Bearer ${token2}`)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.have.property('error');
            res.body.should.have.property('error').eql('you do not have any entries now');
            done();
          });
      });
      it('user can  get a specific entry by id ', (done) => {
        chai.request(app)
          .get((`/api/v1/entries/${propertyId}`))
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message');
            res.body.should.have.property('message').eql('single entry retrived successfully');
            res.body.should.have.property('data');
            res.body.data.should.be.a('object');
            res.body.data.should.have.property('id');
            res.body.data.should.have.property('createdOn');
            res.body.data.should.have.property('ownerId');
            res.body.data.should.have.property('description').eql('it was a long time');
            res.body.data.should.have.property('title').eql('visiting friend');
            done();
          });
      });
      it('user can not get a specific entry which he does not own ', (done) => {
        chai.request(app)
          .get((`/api/v1/entries/${propertyId}`))
          .set('Authorization', `Bearer ${token2}`)
          .end((err, res) => {
            res.body.should.have.property('error');
            res.should.have.status(403);
            res.body.should.have.property('error').eql('Forbidden');
            res.body.should.have.property('status').eql(403);
            done();
          });
      });
      it('user can not get an  entry that does not exist ', (done) => {
        chai.request(app)
          .get('/api/v1/entries/0')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.have.property('error');
            res.body.should.have.property('error').eql('Entry Not found');
            res.body.should.have.property('status').eql(404);
            done();
          });
      });
      it('user can not get an  entry if he doesn not provide a token ', (done) => {
        chai.request(app)
          .get((`/api/v1/entries/${propertyId}`))
          .set('Authorization', '')
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property('error');
            res.body.should.have.property('error').eql('Provide a token');
            res.body.should.have.property('status').eql(401);
            done();
          });
      });
      it('user can not get an  entry if he  provide invalid token ', (done) => {
        chai.request(app)
          .get((`/api/v1/entries/${propertyId}`))
          .set('Authorization', `Bearer ${invalidToken}`)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('error');
            res.body.should.have.property('error').eql('Invalid Token');
            res.body.should.have.property('status').eql(400);
            done();
          });
      });
      it('user can not get an  entry if he does not exist in the system', (done) => {
        chai.request(app)
          .get((`/api/v1/entries/${propertyId}`))
          .set('Authorization', `Bearer ${unExistedToken}`)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.have.property('error');
            res.body.should.have.property('error').eql('Such kind of access token does not match any user!');
            res.body.should.have.property('status').eql(404);
            done();
          });
      });
      it('user can not get entries if he doesn not provide a token ', (done) => {
        chai.request(app)
          .get(('/api/v1/entries'))
          .set('Authorization', '')
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property('error');
            res.body.should.have.property('error').eql('Provide a token');
            res.body.should.have.property('status').eql(401);
            done();
          });
      });
      it('user can not get entries if he  provide invalid token ', (done) => {
        chai.request(app)
          .get(('/api/v1/entries'))
          .set('Authorization', `Bearer ${invalidToken}`)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('error');
            res.body.should.have.property('error').eql('Invalid Token');
            res.body.should.have.property('status').eql(400);
            done();
          });
      });
      it('user can not get entries if he does not exist in the system', (done) => {
        chai.request(app)
          .get(('/api/v1/entries'))
          .set('Authorization', `Bearer ${unExistedToken}`)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.have.property('error');
            res.body.should.have.property('error').eql('Such kind of access token does not match any user!');
            res.body.should.have.property('status').eql(404);
            done();
          });
      });
      it('user can not delete an  entry if he doesn not provide a token ', (done) => {
        chai.request(app)
          .delete((`/api/v1/entries/${propertyId}`))
          .set('Authorization', '')
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property('error');
            res.body.should.have.property('error').eql('Provide a token');
            res.body.should.have.property('status').eql(401);
            done();
          });
      });
      it('user can not delete an  entry if he  provide invalid token ', (done) => {
        chai.request(app)
          .delete((`/api/v1/entries/${propertyId}`))
          .set('Authorization', `Bearer ${invalidToken}`)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('error');
            res.body.should.have.property('error').eql('Invalid Token');
            res.body.should.have.property('status').eql(400);
            done();
          });
      });
      it('user can not delete an  entry if he does not exist in the system', (done) => {
        chai.request(app)
          .delete((`/api/v1/entries/${propertyId}`))
          .set('Authorization', `Bearer ${unExistedToken}`)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.have.property('error');
            res.body.should.have.property('error').eql('Such kind of access token does not match any user!');
            res.body.should.have.property('status').eql(404);
            done();
          });
      });
      it('user can not update an  entry if he doesn not provide a token ', (done) => {
        chai.request(app)
          .patch((`/api/v1/entries/${propertyId}`))
          .set('Authorization', '')
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property('error');
            res.body.should.have.property('error').eql('Provide a token');
            res.body.should.have.property('status').eql(401);
            done();
          });
      });
      it('user can not update an  entry if he  provide invalid token ', (done) => {
        chai.request(app)
          .patch((`/api/v1/entries/${propertyId}`))
          .set('Authorization', `Bearer ${invalidToken}`)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('error');
            res.body.should.have.property('error').eql('Invalid Token');
            res.body.should.have.property('status').eql(400);
            done();
          });
      });
      it('user can not update an  entry if he does not exist in the system', (done) => {
        chai.request(app)
          .patch((`/api/v1/entries/${propertyId}`))
          .set('Authorization', `Bearer ${unExistedToken}`)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.have.property('error');
            res.body.should.have.property('error').eql('Such kind of access token does not match any user!');
            res.body.should.have.property('status').eql(404);
            done();
          });
      });
      it('user should be able to delete his entry', (done) => {
        chai.request(app)
          .delete((`/api/v1/entries/${propertyId}`))
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('data');
            res.body.data.should.be.a('array');
            res.body.should.have.property('message');
            res.body.should.have.property('message').eql('entry deleted successfully');
            res.body.should.have.property('status').eql(200);
            done();
          });
      });
    });
  });

  it('user should get error if he send a request with unhandled route', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error');
        res.body.should.have.property('error').eql('Incorrect route');
        done();
      });
  });
  it('user should get error if he send invalid JSON format', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send('{"invalidJson"}')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        res.body.should.have.property('error').eql('JSON format is not valid!');
        done();
      });
  });
});
