import { Router } from 'express';

const router = Router();

router.get('/channels/:user_id', require('./get-channels').default);
router.post('/channels/delete', require('./delete-channel').default);
router.get('/messages/:from/:to', require('./get-messages').default);
router.post('/channels/create', require('./create-channel').default);

export default router;
