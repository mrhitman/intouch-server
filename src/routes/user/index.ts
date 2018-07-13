import { Router } from 'express';

const router = Router();

router.get('/login', require('./login').default);
router.get('/logout', require('./logout').default);
router.get('/register', require('./register').default);
router.get('/get-profile/:id', require('./get-profile').default);
router.get('/get-friends/:id', require('./get-friends').default);

export default router;