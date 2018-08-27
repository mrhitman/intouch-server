import { Router } from 'express';
import { authenticate } from 'passport';

const router = Router();

router.post('/login', require('./login').default);
router.get('/logout', require('./logout').default);
router.post('/refresh', require('./refresh').default);
router.post('/register', require('./register').default);
router.route('/profile/:id')
    .get(require('./get-profile').default)
    .post(authenticate('jwt', { session: true }), require('./update-profile').default);

router.post('/profile/:id/photo', /*authenticate('jwt', { session: true }),*/ require('./update-profile-image').default);
router.get('/get-friends/:id', require('./get-friends').default);

export default router;