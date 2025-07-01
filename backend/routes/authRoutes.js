import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);  //  correct
router.post('/login',    login);     //  correct

export default router;
