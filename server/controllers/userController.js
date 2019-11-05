import generateAuthToken from '../helpers/tokenEncoder';
import encryptPassword from '../helpers/passwordEncryptor';
import comparePassword from '../helpers/passwordMatcher';
import ResponseHandler from '../helpers/responseHandler';
import Database from '../models/database';
import {
  REQUEST_CONFLICT, REQUEST_SUCCEDED, UNAUTHORIZED, SERVER_ERROR,
  RESOURCE_CREATED,
} from '../helpers/statusCode';

class UserController {
    static signUp = async (req, res) => {
      try {
        let {
          firstName, lastName,
          email, password,
        } = req.body;
        const hashedPassword = await encryptPassword(password);
        const newUser = [firstName, lastName, email, hashedPassword];
        const createUser = 'INSERT INTO users (firstName, lastName, email, password) VALUES ($1, $2, $3, $4) RETURNING *';
        const insertedRow = await Database.execute(createUser, newUser);
        const output = insertedRow[0];
        const { id } = output;
        const { firstname, lastname, createdon } = output;
        const token = generateAuthToken(insertedRow[0]);

        return ResponseHandler.success(RESOURCE_CREATED, 'User created successfully', {
          token, id, firstname, lastname, createdon,
        }, res);
      } catch (e) {
        return ResponseHandler.error(REQUEST_CONFLICT, 'Email is already taken!', res);
      }
    };

    static signIn = async (req, res) => {
      try {
        let { email, password } = req.body;
        const logInUser = 'SELECT * FROM users WHERE email = $1';
        const row = await Database.execute(logInUser, [email]);
        const OutputDeatils = row[0];
        if (OutputDeatils && comparePassword(password, row[0].password)) {
          const token = generateAuthToken(row[0].id, row[0].email);
          const {
            id, firstname, lastname, createdon,
          } = OutputDeatils;
          return ResponseHandler.success(REQUEST_SUCCEDED, 'User is successfully logged in', {
            token, id, firstname, lastname, createdon,
          }, res);
        }
        return ResponseHandler.error(UNAUTHORIZED, 'email or password is incorrect!', res);
      } catch (e) {
        return ResponseHandler.error(SERVER_ERROR, `Internal server error occured: ${e} `, res);
      }
    };
}

export default UserController;
