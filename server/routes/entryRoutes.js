import express from 'express';
import entry from '../controllers/entryControllers';
import helper from '../middleware/helper';

const router = express.Router();
router.post('/', helper.verifyToken, entry.create);
router.get('/:id', helper.verifyToken, helper.permission, entry.findOne);
router.get('/', helper.verifyToken, entry.findAll);
router.patch('/:id', helper.verifyToken, helper.permission, entry.update);
router.delete('/:id', helper.verifyToken, helper.permission, entry.delete);
export default router;
