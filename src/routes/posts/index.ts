import { Router } from 'express';

const router = Router();

router.get('/:id', require('./get').default);
router.post('/comment', require('./comment').default);

export default router;