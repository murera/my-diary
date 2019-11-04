import express from 'express';
import UserController from '../controllers/userController';
import {
  signupValidator,
  signinValidator,
} from '../middleware/validator';

const router = express.Router();
const { signUp, signIn } = UserController;


export default router;
