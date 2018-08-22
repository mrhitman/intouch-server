import { Router } from 'express';

const router = Router();

router.get('//', require('./get').default);

export default router;