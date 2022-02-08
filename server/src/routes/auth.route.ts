import express from 'express';
import * as users from '../controllers/auth.controller'

const router = express.Router();

router.post('/login', users.login)

router.post('/register', users.register)

router.get('/refresh_token', users.refreshToken)

export default router;