import { Router } from 'express';

const router = Router();

router.get('/:id', require('./get').default);

export default router;