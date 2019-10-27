import express from 'express';
import entry from '../controllers/entryControllers';
import helper from '../middleware/helper';

const router = express.Router();
router.post('/', helper.verifyToken, entry.create);
router.get('/:id', helper.verifyToken, entry.findOne);
router.get('/', helper.verifyToken, entry.findAll);
router.patch('/:id', helper.verifyToken, entry.update);
router.delete('/:id', helper.verifyToken, entry.delete);
module.exports = router;
