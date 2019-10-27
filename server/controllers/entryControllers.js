import express from 'express';
import bodyParser from 'body-parser';
import entryModel from '../models/entryModels';
import Response from '../helpers/responseHandler';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const entryController = {
  create(req, res) {
    const newEntry = entryModel.addEntry(req);
    Response.display(newEntry.status, newEntry.message, newEntry.error, newEntry.data, res);
  },
  findOne(req, res) {
    const grabOne = entryModel.getSpecificEntry(req, req.params.id);
    Response.display(grabOne.status, grabOne.message, grabOne.error, grabOne.data, res);
  },
  findAll(req, res) {
    const obtainAll = entryModel.getEntries(req);
    Response.display(obtainAll.status, obtainAll.message, obtainAll.error, obtainAll.data, res);
  },
  delete(req, res) {
    const moveToTrash = entryModel.remove(req);
    Response.display(moveToTrash.status, moveToTrash.message, moveToTrash.error, moveToTrash.data, res);
  },
  update(req, res) {
    const editEntry = entryModel.modify(req);
    Response.display(editEntry.status, editEntry.message, editEntry.error, editEntry.data, res);
  },
};
export default entryController;
