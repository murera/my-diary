import express from 'express';
import EntryController from '../controllers/entryController';
import isUserExist from '../middleware/isUserExist';
import {
  entryValidator,
}
  from '../middleware/validator';

const router = express.Router();
const {
  createEntry, getMyEntries,
} = EntryController;

router.post('/entries',

  isUserExist,
  entryValidator,
  createEntry);
router.get('/entries',
  isUserExist,
  getMyEntries);
export default router;
