import { Router } from 'express';
import { authenticate } from 'passport';

const router = Router();

router.post('/login', require('./login').default);
router.get('/logout', require('./logout').default);
router.get('/register', require('./register').default);
router.route('/profile/:id')
    .get(require('./get-profile').default)
    .post(require('./update-profile').default);
router.get('/get-friends/:id', authenticate('jwt', { session: false }), require('./get-friends').default);

export default router;