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
        let token = req.header('x-auth-token');
        const owner = grabEmployeeIdFromToken(token, res);
        const findIfEntryexist = 'SELECT * FROM entries WHERE title = $1 and ownerid = $2';
        const entryExist = await Database.execute(findIfEntryexist, [title, owner]);
        if (entryExist[0]) {
          return ResponseHandler.error(REQUEST_CONFLICT, 'The same entry exists', res);
        }

        const createEntry = 'INSERT INTO entries (title, description, ownerId) VALUES ($1, $2, $3) RETURNING *';
        const entryCreated = await Database.execute(createEntry,
          [title, description, owner]);
        return ResponseHandler.success(RESOURCE_CREATED, 'Entry successfully created', entryCreated[0], res);
      } catch (e) {
        return ResponseHandler.error(SERVER_ERROR, `Internal server error occured: ${e} `, res);
      }
    };
}

export default EntryController;
