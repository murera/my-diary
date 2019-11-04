import datetime from 'node-datetime';
import grabEmployeeIdFromToken from '../helpers/tokenDecoder';
import ResponseHandler from '../helpers/responseHandler';
import {
  RESOURCE_CREATED, REQUEST_SUCCEDED, SERVER_ERROR, REQUEST_CONFLICT,NOT_FOUND,
} from '../helpers/statusCode';
import Database from '../models/database';