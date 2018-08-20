import { Router } from 'express';

// import { authenticate } from 'passport';

const router = Router();

router.post('/login', require('./login').default);
router.get('/logout', require('./logout').default);
router.post('/register', require('./register').default);
router.route('/profile/:id')
    .get(require('./get-profile').default)
    .post(require('./update-profile').default);
router.post('/profile/:id/photo', require('./update-profile-image').default);
// router.get('/get-friends/:id', authenticate('jwt', { session: true }), require('./get-friends').default);
router.get('/get-friends/:id', require('./get-friends').default);

export default router;