import express from 'express';
import {login} from '../controllers/users.controller'
const router = express.Router();


router.get('/login', login)

router.get('/register', (req, res) => {
    res.status(200).send('Login succuess!')
})

export default router;