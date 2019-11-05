import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import ResponseHandler from '../helpers/responseHandler';
import {
  UNAUTHORIZED,
  BAD_REQUEST,
} from '../helpers/statusCode';
import Database from '../models/database';

dotenv.config();
const isEmployee = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return ResponseHandler.error(UNAUTHORIZED, 'No access token found!', res);
  }

  try {
    const { id } = jwt.verify(token, process.env.JWTSECRET);
    const user = 'SELECT * FROM users WHERE id = $1 ';
    const findUserExistence = await Database.execute(user, [id]);
    if (!findUserExistence.length) {
      return ResponseHandler.error(UNAUTHORIZED, 'Such kind of access token does not match any user!', res);
    }
    next();
  } catch (error) {
    return ResponseHandler.error(BAD_REQUEST, error.message, res);
  }
};

export default isEmployee;
