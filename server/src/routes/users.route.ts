import express from 'express';
import * as users from '../controllers/users.controller'

const router = express.Router();

router.get('/:id', users.getUser)

export default router