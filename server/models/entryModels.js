import joi from 'joi';
import moment from 'moment';
import data from '../data/data';
import schema from '../middleware/validation';
import Response from '../helpers/responseHandler';
import {
  BAD_REQUEST, RESOURCE_CREATED, NOT_FOUND, FORBIDDEN, REQUEST_SUCCEDED,
} from '../helpers/statusCode';

class EntryModel {
  addEntry = (req) =>{
    const newEntry = { ...req.body };
    if (data.entries.length === 0) {
      newEntry.id = 1;
    } else {
      newEntry.id = data.entries[data.entries.length - 1].id + 1;
    }
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
    const entry = data.entries.find((entry) => entry.id == id);

    if (!entry) {
      return Response.error(NOT_FOUND, 'Entry Not found');
    }
    if (entry.ownerId !== req.payload.id) {
      return Response.error(FORBIDDEN, 'Forbidden');
    }
    return Response.success(REQUEST_SUCCEDED, 'single entry retrived successfully', entry);
  }

  getEntries = (req) =>{
    const entries = data.entries.filter((entry) => entry.ownerId === req.payload.id);
    if (entries.length < 1) {
		  return Response.error(NOT_FOUND, 'you do not have any entries now');
	  }
    return Response.success(REQUEST_SUCCEDED, 'all entries retrived successfully', entries);
  }

  remove = (req) => {
    const { id } = req.params;
    const getentry = this.getSpecificEntry(req, id);
    if (getentry.status !== REQUEST_SUCCEDED) { return Response.error(getentry.status, getentry.error); }
    const entry = getentry.data;
    if (entry) {
      const index = data.entries.indexOf(entry);
      data.entries.splice(index, 1);
      return Response.success(REQUEST_SUCCEDED, 'entry deleted successfully', []);
    }
  }

  modify = (req) => {
    const { id } = req.params;
    const details = req.body;
    let fetchEntry = this.getSpecificEntry(req, id);
    let index;
    if (fetchEntry.status !== REQUEST_SUCCEDED) { return Response.error(fetchEntry.status, fetchEntry.error); }
    const entry = fetchEntry.data;
    if (entry) {
      index = data.entries.indexOf(entry);
      for (let prop in details) {
        for (let sameprop in entry) {
          if (prop === sameprop) {
            entry[prop] = details[sameprop];
          }
        }
      }
      const {
        title, description,
      } = entry;
      const { error } = joi.validate({
        title, description,
      }, schema.entry);

      if (error !== null) {
        return Response.error(BAD_REQUEST, error.details[0].message);
			  }

      data.entries.splice(index, 1, entry);
      return Response.success(REQUEST_SUCCEDED, 'entry successfully edited', data.entries[index]);
    }
  }
}
module.exports = new EntryModel();
