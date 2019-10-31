import joi from 'joi';
import moment from 'moment';
import data from '../data/data';
import schema from '../middleware/validation';
import Response from '../helpers/responseHandler';
import getById from '../helpers/findone';
import {
  BAD_REQUEST, RESOURCE_CREATED, NOT_FOUND, REQUEST_SUCCEDED,
} from '../helpers/statusCode';

class EntryModel {
  addEntry = (req) => {
    const newEntry = { ...req.body };
    newEntry.id = data.entries.length + 1;
    const {
      title, description,
    } = req.body;
    const { error } = joi.validate({
      title, description,
    }, schema.entry);

    if (error !== null) {
      return Response.error(BAD_REQUEST, error.details[0].message);
		  }
    const { id } = req.payload;
    newEntry.createdOn = moment(new Date());
    newEntry.ownerId = id;
    data.entries.push(newEntry);
    return Response.success(RESOURCE_CREATED, 'entry successfully created', data.entries[data.entries.indexOf(newEntry)]);
  }

  getSpecificEntry = (req, id) => {
    const getOne = getById(id);
    return Response.success(REQUEST_SUCCEDED, 'single entry retrived successfully', getOne);
  }

  getEntries = (req) => {
    const sortedEntries = data.entries.sort((a, b) => (new Date(b.createdOn)).getTime()
      - (new Date(a.createdOn).getTime()));
    const entries = sortedEntries.filter((entry) => entry.ownerId === req.payload.id);
    if (entries.length < 1) {
		  return Response.error(NOT_FOUND, 'you do not have any entries now');
	  }
    return Response.success(REQUEST_SUCCEDED, 'all entries retrived successfully', entries);
  }

  remove = (req) => {
    const { id } = req.params;
    const getentry = getById(id);
    if (getentry) {
      const index = data.entries.indexOf(getentry);
      data.entries.splice(index, 1);
      return Response.success(REQUEST_SUCCEDED, 'entry deleted successfully', []);
    }
  }

  modify = (req) => {
    const details = req.body;
    const { id } = req.params;
    let fetchEntry = getById(id);
    let index;
    if (fetchEntry) {
      index = data.entries.indexOf(fetchEntry);
      for (let prop in details) {
        for (let sameprop in fetchEntry) {
          if (prop === sameprop) {
            fetchEntry[prop] = details[sameprop];
          }
        }
      }
      const {
        title, description,
      } = fetchEntry;
      const { error } = joi.validate({
        title, description,
      }, schema.entry);

      if (error !== null) {
        return Response.error(BAD_REQUEST, error.details[0].message);
			  }

      data.entries.splice(index, 1, fetchEntry);
      return Response.success(REQUEST_SUCCEDED, 'entry successfully edited', data.entries[index]);
    }
  }
}
export default new EntryModel();
