import { Router } from 'express';
import { authenticate } from 'passport';

const router = Router();

router.post('/login', require('./login').default);
router.post('/logout', authenticate('jwt', { session: false }), require('./logout').default);
router.post('/refresh', require('./refresh').default);
router.post('/register', require('./register').default);
router.route('/profile/:id')
    .get(require('./get-profile').default)
    .post(authenticate('jwt'), require('./update-profile').default);

router.post('/profile/:id/photo', authenticate('jwt', { session: false }), require('./update-profile-image').default);
router.get('/get-friends/:id', require('./get-friends').default);

export default router;