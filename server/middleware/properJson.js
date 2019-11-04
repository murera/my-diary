import { BAD_REQUEST } from '../helpers/statusCode';
import ResponseHandler from '../helpers/responseHandler';

const properJson = (error, req, res, next) => {
  if (error instanceof SyntaxError
     && error.status === 400 && 'body' in error) {
    return ResponseHandler.error(BAD_REQUEST, 'invalid JSON format!', res);
  }
  next();
};

export default properJson ;
