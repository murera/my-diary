import bcrypt from 'bcrypt';
import env from 'dotenv';
import jwt from 'jsonwebtoken';
import data from '../data/data';
import { UNAUTHORIZED, BAD_REQUEST, NOT_FOUND } from '../helpers/statusCode';

env.config();
const Helper = {
  hashThePassword(password) {
    const salt = bcrypt.genSaltSync(12);
    return bcrypt.hashSync(password, salt);
  },
  checkThepassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  // get token on login
  getToken({
    id, email, firstName, lastName,
  }) {
    const token = jwt.sign({
      id, email, firstName, lastName,
    }, process.env.SECRET_KEY);
    return token;
  },

  verifyToken(req, res, next) {
    const bearerHeader = req.headers.authorization;
    if (!bearerHeader) {
      return res.status(UNAUTHORIZED).json({ status: UNAUTHORIZED, error: 'Provide a token' });
    }
    let output = 'nothing';
    const token = bearerHeader.split(' ')[1];
    try {
      output = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      return res.status(BAD_REQUEST).json({ status: BAD_REQUEST, error: 'Invalid Token' });
    }
    const { id, email } = output;
    const grabUser = data.users.find((user) => user.email === email);
    if (!grabUser) {
      return res.status(NOT_FOUND).json({ status: NOT_FOUND, error: 'Such kind of access token does not match any user!' });
    }
    req.token = token;
    req.payload = { id, email };
    next();
  },
};
export default Helper;
