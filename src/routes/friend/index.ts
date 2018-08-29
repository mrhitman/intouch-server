import { Router } from 'express';
import { authenticate } from 'passport';

const router = Router();

router.get('/follow/:id/:friend_user_id', authenticate('jwt', { session: false }), require('./follow').default);
router.get('/unfollow/:id/:friend_user_id', authenticate('jwt', { session: false }), require('./unfollow').default);

export default router;