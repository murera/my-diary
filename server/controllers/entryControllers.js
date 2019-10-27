import express from 'express';
import bodyParser from 'body-parser';
import entryModel from '../models/entryModels';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const entryController = {
  create(req, res) {
    const {
      status, message, error, data,
    } = entryModel.addEntry(req);

    res.status(status).json({
      status, message, error, data,
    });
  },
  findOne(req, res) {
    const {
      status, message, error, data,
    } = entryModel.getSpecificEntry (req, req.params.id);
    res.status(status).json({
      status, message, error, data,
    });
  },
  findAll(req, res) {
    const {
      status, message, error, data,
    } = entryModel.getEntries(req);
    res.status(status).json({
      status, message, error, data,
    });
  },
  delete(req, res) {
    const {
      status, message, error, data,
    } = entryModel.remove(req);
    res.status(status).json({
      status, message, error, data,
    });
  },
  update(req, res) {
    const {
      status, message, error, data,
    } = entryModel.modify(req);
    res.status(status).json({
      status, message, error, data,
    });
  },
};
export default entryController;
