import datetime from 'node-datetime';
import grabEmployeeIdFromToken from '../helpers/tokenDecoder';
import ResponseHandler from '../helpers/responseHandler';
import {
  RESOURCE_CREATED, REQUEST_SUCCEDED, SERVER_ERROR, REQUEST_CONFLICT, NOT_FOUND,
} from '../helpers/statusCode';
import Database from '../models/database';

class EntryController {
    static createEntry = async (req, res) => {
      try {
        let { title, description } = req.body;
        let token = req.header('authorization');
        const owner = grabEmployeeIdFromToken(token, res);
        const createEntry = 'INSERT INTO entries (title, description, ownerId) VALUES ($1, $2, $3) RETURNING *';
        const entryCreated = await Database.execute(createEntry,
          [title, description, owner]);
        return ResponseHandler.success(RESOURCE_CREATED, 'Entry successfully created', entryCreated[0], res);
      } catch (e) {
        return ResponseHandler.error(SERVER_ERROR, `Internal server error occured: ${e} `, res);
      }
    };

    static getMyEntries = async (req, res) => {
      try {
        const token = req.header('authorisation');
        const authorId = grabEmployeeIdFromToken(token, res);
        const myEntries = 'SELECT * FROM entries WHERE ownerId = $1 ORDER BY createdOn DESC ';
        const getMyEntries = await Database.execute(myEntries, [authorId]);
        if (getMyEntries.length === 0) {return ResponseHandler.error(NOT_FOUND, 'You do not have any entry now!', res);}
        return ResponseHandler.success(REQUEST_SUCCEDED, 'Your entries returned successfully', getMyEntries, res);
      } catch (e) {
        return ResponseHandler.error(SERVER_ERROR, `Internal server error occured: ${e} `, res);
      }
    };
}

export default EntryController;
