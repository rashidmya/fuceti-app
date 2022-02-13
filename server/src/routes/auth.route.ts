import express from 'express';
import * as auth from '../controllers/auth.controller'
import { authenticate } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/login', auth.login)

router.post('/register', auth.register)

router.get('/refresh_token', auth.refresh)

router.get('/verify', authenticate, auth.verify)

router.get('logout', auth.logout)

export default router;