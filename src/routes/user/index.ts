import { Router } from 'express';
import { authenticate } from 'passport';

const router = Router();
const opts = { session: false };

router.post('/login', require('./login').default);
router.post('/logout', authenticate('jwt', opts), require('./logout').default);
router.post('/refresh', require('./refresh').default);
router.post('/register', require('./register').default);
router.route('/profile/:id')
    .get(require('./get-profile').default)
    .post(authenticate('jwt', opts), require('./update-profile').default);

router.post('/profile/:id/photo', authenticate('jwt', opts), require('./update-profile-image').default);
router.get('/get-friends/:id', require('./get-friends').default);

export default router;