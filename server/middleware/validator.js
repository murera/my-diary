import Joi from 'joi';
import ResponseHandler from '../helpers/responseHandler';
import grabEmployeeIdFromToken from '../helpers/tokenDecoder';
import {
  BAD_REQUEST, NOT_FOUND,
  FORBIDDEN,
} from '../helpers/statusCode';
import Database from '../models/database';

const signupValidator = (req, res, next) => {
  const schema = {
    firstName: Joi.string().min(4).trim().required(),
    lastName: Joi.string().min(4).trim().required(),
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(8).required(),
    
  };
  const result = Joi.validate(req.body, schema);
  if (result.error !== null) {
    return ResponseHandler.error(BAD_REQUEST, `${result.error.details[0].message}`, res);
  }
 
  next();
};
const signinValidator = (req, res, next) => {
  const schema = {
    email: Joi.string().email().trim().required(),
    password: Joi.required(),
  };
  const result = Joi.validate(req.body, schema);
  if (result.error !== null) {
    return ResponseHandler.error(BAD_REQUEST, `${result.error.details[0].message}`, res);
  }
  next();
};
const entryValidator = (req, res, next) => {
  const schema = {
    title: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
  };
  const result = Joi.validate(req.body, schema);
  if (result.error !== null) {
    return ResponseHandler.error(BAD_REQUEST, `${result.error.details[0].message}`, res);
  }
  next();
 };
const permission = async (req, res, next) => {
  const employeeToken = req.header('authorization').trim();
  let  {entryId} = req.params;
  if (isNaN(entryId)) {
    return ResponseHandler.error(BAD_REQUEST, 'entryId must be a number!', res);
  }
  const findOne = `SELECT * FROM entries WHERE id = $1`;
  const getOne  = await Database.execute(findOne, [entryId]);
 
  if (!getOne.length) {
    return ResponseHandler.error(NOT_FOUND, 'Such entry is not found!', res);
  }
  const authorId = grabEmployeeIdFromToken(employeeToken, res);
  if (!(getOne[0].ownerid == authorId)) {
    return ResponseHandler.error(FORBIDDEN, ' you are not the owner this entry', res);
  }
  next();
};

export {
  signupValidator,
  signinValidator,
  entryValidator,
  permission,
};
