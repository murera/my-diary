import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { testData, invalidToken, unExistedToken } from '../helpers/testData';

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
    it('it should not create an entry if token is not recogized', (done) => {
      chai.request(app)
        .post('/api/v2/entries')
        .set('Accept', 'application/json')
        .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzM5LCJlbWFpbCI6ImFtYW5pbXVyZXJhZGRAZ21haWwuY29tIiwiaWF0IjoxNTczMDE5NTQzfQ.VZi9H-dzl3PN3K8ipD_bCqFZsjQ_Pz84PGjp8tFVvd')
        .send(testData[13])
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          res.body.should.have.property('status').eql(400);
          res.body.should.have.property('error').eql('invalid signature');
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
    // user edit delete and update his entries
    describe('user can alter his entries', () => {
      before('create an entry', (done) => {
        chai.request(app)
          .post('/api/v2/entries')
          .set('Accept', 'application/json')
          .set('authorization', token)
          .send(testData[18])
          .end((err, res) => {
            propertyId = res.body.data.id;
            res.should.have.status(201);
            res.body.should.have.property('status').eql(201);
            done();
          });
      });

      it('user can edit an entry', (done) => {
        chai.request(app)
          .patch(`/api/v2/entries/${propertyId}`)
          .set('Accept', 'application/json')
          .set('authorization', token)
          .send(testData[19])
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
          .delete('/api/v2/entries/0')
          .set('Accept', 'application/json')
          .set('authorization', token)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.have.property('error');
            res.body.should.have.property('error').eql('Such entry is not found!');
            res.body.should.have.property('status').eql(404);
            done();
          });
      });
      it('user can not delete an entry which he does not own ', (done) => {
        chai.request(app)
          .delete(`/api/v2/entries/${propertyId}`)
          .set('Accept', 'application/json')
          .set('authorization', token2)
          .end((err, res) => {
            res.should.have.status(403);
            res.body.should.have.property('error');
            res.body.should.have.property('error').eql('you are not the owner of this entry');
            res.body.should.have.property('status').eql(403);
            done();
          });
      });
      it('user can not delete an entry when Id is not a number ', (done) => {
        chai.request(app)
          .delete('/api/v2/entries/am')
          .set('Accept', 'application/json')
          .set('authorization', token2)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('error');
            res.body.should.have.property('error').eql('entryId must be a number!');
            res.body.should.have.property('status').eql(400);
            done();
          });
      });
      it('user can not delete an entry if He does not exist in the system ', (done) => {
        chai.request(app)
          .delete('/api/v2/entries/am')
          .set('Accept', 'application/json')
          .set('authorization', unExistedToken)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property('error');
            res.body.should.have.property('error').eql('Such kind of access token does not match any user!');
            res.body.should.have.property('status').eql(401);
            done();
          });
      });
      it('user can not update an entry if He does not exist in the system ', (done) => {
        chai.request(app)
          .patch('/api/v2/entries/am')
          .set('Accept', 'application/json')
          .set('authorization', unExistedToken)
          .send(testData[19])
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property('error');
            res.body.should.have.property('error').eql('Such kind of access token does not match any user!');
            res.body.should.have.property('status').eql(401);
            done();
          });
      });
      it('user can not update a non existing entry', (done) => {
        chai.request(app)
          .patch('/api/v2/entries/0')
          .set('Accept', 'application/json')
          .set('authorization', token)
          .send(testData[19])
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.have.property('error');
            res.body.should.have.property('error').eql('Such entry is not found!');
            res.body.should.have.property('status').eql(404);
            done();
          });
      });
      it('user can not update an entry which he does not own ', (done) => {
        chai.request(app)
          .patch(`/api/v2/entries/${propertyId}`)
          .set('Accept', 'application/json')
          .set('authorization', token2)
          .send(testData[19])
          .end((err, res) => {
            res.should.have.status(403);
            res.body.should.have.property('error');
            res.body.should.have.property('error').eql('you are not the owner of this entry');
            res.body.should.have.property('status').eql(403);
            done();
          });
      });
      it('user can not update an entry when Id is not a number ', (done) => {
        chai.request(app)
          .patch('/api/v2/entries/am')
          .set('Accept', 'application/json')
          .set('authorization', token)
          .send(testData[19])
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('error');
            res.body.should.have.property('error').eql('entryId must be a number!');
            res.body.should.have.property('status').eql(400);
            done();
          });
      });

      it('user can get all entries ', (done) => {
        chai.request(app)
          .get('/api/v2/entries')
          .set('Accept', 'application/json')
          .set('authorization', token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message');
            res.body.should.have.property('message').eql('Your entries returned successfully');
            res.body.should.have.property('data');
            res.body.data.should.be.a('array');
            res.body.should.have.property('status').eql(200);
            done();
          });
      });
      it('user can not get entries if his dairy is empty ', (done) => {
        chai.request(app)
          .get('/api/v2/entries')
          .set('Accept', 'application/json')
          .set('authorization', token2)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.have.property('error');
            res.body.should.have.property('error').eql('You do not have any entry now!');
            res.body.should.have.property('status').eql(404);
            done();
          });
      });
      it('user can not get all entries if He does not exist in the system ', (done) => {
        chai.request(app)
          .get('/api/v2/entries')
          .set('Accept', 'application/json')
          .set('authorization', unExistedToken)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property('error');
            res.body.should.have.property('error').eql('Such kind of access token does not match any user!');
            res.body.should.have.property('status').eql(401);
            done();
          });
      });
      it('user can not get all entries if He does not provide a token ', (done) => {
        chai.request(app)
          .get('/api/v2/entries')
          .set('Accept', 'application/json')
          .set('authorization', '')
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property('error');
            res.body.should.have.property('error').eql('No access token found!');
            res.body.should.have.property('status').eql(401);
            done();
          });
      });
      it('user can  get a specific entry by id ', (done) => {
        chai.request(app)
          .get((`/api/v2/entries/${propertyId}`))
          .set('Accept', 'application/json')
          .set('authorization', token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message');
            res.body.should.have.property('message').eql('single entry successfully retrived');
            res.body.should.have.property('data');
            res.body.data.should.be.a('object');
            res.body.data.should.have.property('id');
            res.body.data.should.have.property('createdon');
            res.body.data.should.have.property('ownerid');
            res.body.data.should.have.property('description').eql('edited description');
            res.body.data.should.have.property('title').eql('an edited title');
            done();
          });
      });
      it('user can not get a specific entry which he does not own ', (done) => {
        chai.request(app)
          .get((`/api/v2/entries/${propertyId}`))
          .set('Accept', 'application/json')
          .set('authorization', token2)
          .end((err, res) => {
            res.body.should.have.property('error');
            res.should.have.status(403);
            res.body.should.have.property('error').eql('you are not the owner of this entry');
            res.body.should.have.property('status').eql(403);
            done();
          });
      });
      it('user can not get an  entry that does not exist ', (done) => {
        chai.request(app)
          .get('/api/v2/entries/0')
          .set('Accept', 'application/json')
          .set('authorization', token)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.have.property('error');
            res.body.should.have.property('error').eql('Such entry is not found!');
            res.body.should.have.property('status').eql(404);
            done();
          });
      });
      it('user can not get an  entry if he doesn not provide a token ', (done) => {
        chai.request(app)
          .get((`/api/v2/entries/${propertyId}`))
          .set('Accept', 'application/json')
          .set('authorization', '')
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property('error');
            res.body.should.have.property('error').eql('No access token found!');
            res.body.should.have.property('status').eql(401);
            done();
          });
      });
      it('user can not get an  entry if he  provide invalid token ', (done) => {
        chai.request(app)
          .get((`/api/v2/entries/${propertyId}`))
          .set('Accept', 'application/json')
          .set('authorization', invalidToken)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('error');
            res.body.should.have.property('error').eql('jwt malformed');
            res.body.should.have.property('status').eql(400);
            done();
          });
      });
      it('user can not get an  entry if he does not exist in the system', (done) => {
        chai.request(app)
          .get((`/api/v2/entries/${propertyId}`))
          .set('Accept', 'application/json')
          .set('authorization', unExistedToken)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property('error');
            res.body.should.have.property('error').eql('Such kind of access token does not match any user!');
            res.body.should.have.property('status').eql(401);
            done();
          });
      });
      it('user can not get an  entries if he does not exist in the system', (done) => {
        chai.request(app)
          .get('/api/v2/entries')
          .set('Accept', 'application/json')
          .set('authorization', unExistedToken)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property('error');
            res.body.should.have.property('error').eql('Such kind of access token does not match any user!');
            res.body.should.have.property('status').eql(401);
            done();
          });
      });
      it('user can not get an  entries if he  provide invalid token ', (done) => {
        chai.request(app)
          .get('/api/v2/entries')
          .set('Accept', 'application/json')
          .set('authorization', invalidToken)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('error');
            res.body.should.have.property('error').eql('jwt malformed');
            res.body.should.have.property('status').eql(400);
            done();
          });
      });
      it('user can not delete an  entry if he doesn not provide a token ', (done) => {
        chai.request(app)
          .delete((`/api/v2/entries/${propertyId}`))
          .set('Accept', 'application/json')
          .set('authorization', '')
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property('error');
            res.body.should.have.property('error').eql('No access token found!');
            res.body.should.have.property('status').eql(401);
            done();
          });
      });
      it('user can not delete an  entries if he  provide invalid token ', (done) => {
        chai.request(app)
          .delete((`/api/v2/entries/${propertyId}`))
          .set('Accept', 'application/json')
          .set('authorization', invalidToken)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('error');
            res.body.should.have.property('error').eql('jwt malformed');
            res.body.should.have.property('status').eql(400);
            done();
          });
      });
      it('user can not update an  entry if he doesn not provide a token ', (done) => {
        chai.request(app)
          .patch((`/api/v2/entries/${propertyId}`))
          .set('Accept', 'application/json')
          .set('authorization', '')
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property('error');
            res.body.should.have.property('error').eql('No access token found!');
            res.body.should.have.property('status').eql(401);
            done();
          });
      });
      it('user can not update an  entries if he  provide invalid token ', (done) => {
        chai.request(app)
          .patch((`/api/v2/entries/${propertyId}`))
          .set('Accept', 'application/json')
          .set('authorization', invalidToken)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('error');
            res.body.should.have.property('error').eql('jwt malformed');
            res.body.should.have.property('status').eql(400);
            done();
          });
      });
      it('user should be able to delete his entry', (done) => {
        chai.request(app)
          .delete((`/api/v2/entries/${propertyId}`))
          .set('Accept', 'application/json')
          .set('authorization', token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('data');
            res.body.data.should.be.a('array');
            res.body.should.have.property('message');
            res.body.should.have.property('message').eql('entry successfully deleted');
            res.body.should.have.property('status').eql(200);
            done();
          });
      });
    });
  });
});
