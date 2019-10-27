import { BAD_REQUEST } from '../helpers/statusCode';

const properJson = (error, req, res, next) => {
  if (error instanceof SyntaxError
       && error.status === 400 && 'body' in error) {
    return res.status(BAD_REQUEST).json({ status: BAD_REQUEST, error: 'JSON format is not valid!' });
  }
  next();
};
export default properJson;
