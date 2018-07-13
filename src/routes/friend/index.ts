import { Router } from 'express';

const router = Router();

router.get('/follow/:id/:friend_user_id', require('./follow').default);
router.get('/unfollow/:id/:friend_user_id', require('./unfollow').default);

export default router;