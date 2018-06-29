import { Router } from 'express';

const router = Router();

router.get('/login', require('./login').default);
router.get('/logout', require('./logout').default);
router.get('/register', require('./register').default);

export default router;