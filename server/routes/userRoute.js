import express from 'express';
import UserController from '../controllers/userController';
import {
  signupValidator,

} from '../middleware/validator';

const router = express.Router();
const { signUp } = UserController;
router.post('/signup', signupValidator, signUp);
export default router;
