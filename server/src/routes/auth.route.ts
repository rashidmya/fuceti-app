import express from 'express';
import * as users from '../controllers/auth.controller'
import { authenticate } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/login', users.login)

router.post('/register', users.register)

router.get('/refresh_token', users.refresh)

router.get('/verify', authenticate, users.verify)

router.get('logout', users.logout)

export default router;