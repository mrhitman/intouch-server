import { Router } from 'express';

const router = Router();

router.get('/channels/:user_id', require('./get-channels').default);
router.delete('/channels/:id', require('./delete-channel').default);
router.get('/messages/:from/:to', require('./get-messages').default);

export default router;
