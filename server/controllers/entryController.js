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
        const token = req.header('authorization');
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
        const token = req.header('authorization');
        const authorId = grabEmployeeIdFromToken(token, res);
        const myEntries = 'SELECT * FROM entries WHERE ownerId = $1 ORDER BY createdOn DESC ';
        const getMyEntries = await Database.execute(myEntries, [authorId]);
        if (getMyEntries.length === 0) { return ResponseHandler.error(NOT_FOUND, 'You do not have any entry now!', res); }
        return ResponseHandler.success(REQUEST_SUCCEDED, 'Your entries returned successfully', getMyEntries, res);
      } catch (e) {
        return ResponseHandler.error(SERVER_ERROR, `Internal server error occured: ${e} `, res);
      }
    };

    static getSpeciEntry = async (req, res) => {
      try {
        const getSingleEntry = 'SELECT * FROM entries WHERE id = $1';
        const EntryFetched = await Database.execute(getSingleEntry, [req.params.entryId]);
        return ResponseHandler.success(REQUEST_SUCCEDED, 'single entry successfully retrived', EntryFetched[0], res);
      } catch (e) {
        return ResponseHandler.error(SERVER_ERROR, `Internal server error occured: ${e} `, res);
      }
    };

    static editEntry = async (req, res) => {
      try {
        let { entryId } = req.params;

        const getCurrent = 'SELECT * FROM entries WHERE id = $1';
        const update = 'UPDATE entries SET title = $1, description = $2 WHERE id = $3 RETURNING *';

        const current = await Database.execute(getCurrent, [entryId]);
        const { title, description } = current[0];
        const updatedTitle = req.body.title || title;

        const updateDescription = req.body.description || description;
        const updated = await Database.execute(update, [updatedTitle, updateDescription, entryId]);
        return ResponseHandler.success(REQUEST_SUCCEDED, 'entry successfully edited', updated[0], res);
      } catch (e) {
        return ResponseHandler.error(SERVER_ERROR, `Internal server error occured: ${e} `, res);
      }
    };

    static removeEntry = async (req, res) => {
      try {
        let { entryId } = req.params;
        const deleteEntry = 'DELETE FROM entries WHERE id = $1';
        await Database.execute(deleteEntry, [entryId]);
        const checkIfDeleted = 'SELECT * FROM entries WHERE id = $1';
        const query = await Database.execute(checkIfDeleted, [entryId]);
        if (query.length === 0) {
          return ResponseHandler.success(REQUEST_SUCCEDED, 'entry successfully deleted', [], res);
        }
      } catch (e) {
        return ResponseHandler.error(SERVER_ERROR, `Internal server error occured: ${e} `, res);
      }
    };
}

export default EntryController;
