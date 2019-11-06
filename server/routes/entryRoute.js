import express from 'express';
import EntryController from '../controllers/entryController';
import isUserExist from '../middleware/isUserExist';
import {
  entryValidator, permission,
}
  from '../middleware/validator';

const router = express.Router();
const {
  createEntry, getMyEntries, getSpeciEntry, editEntry, removeEntry,
} = EntryController;

router.post('/entries',

  isUserExist,
  entryValidator,
  createEntry);
router.get('/entries',
  isUserExist,
  getMyEntries);
  router.get('/entries/:entryId',
  isUserExist,
  permission,
  getSpeciEntry);
  router.patch('/entries/:entryId',
  isUserExist,
  permission,
  entryValidator,
  editEntry);
  router.delete('/entries/:entryId',
  isUserExist,
  permission,
  removeEntry);
export default router;
