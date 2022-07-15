import { Router } from "express";
const router = Router();

import * as authCtrl from '../controllers/auth.controller'

router.post('/signin', authCtrl.SignIn);

router.post('/signup', authCtrl.SignUp);

export default router;