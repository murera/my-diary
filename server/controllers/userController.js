import generateAuthToken from '../helpers/tokenEncoder';
import encryptPassword from '../helpers/passwordEncryptor';
import comparePassword from '../helpers/passwordMatcher';
import ResponseHandler from '../helpers/responseHandler';
import Database from '../models/database';
import {
  REQUEST_CONFLICT,
  RESOURCE_CREATED, REQUEST_SUCCEDED,
  UNAUTHORIZED, SERVER_ERROR,
} from '../helpers/statusCode';