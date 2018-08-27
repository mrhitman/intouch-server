import { Router } from 'express';

const router = Router();

router.post('add', require('./add').default);
router.post('delete', require('./add').default);

export default router;