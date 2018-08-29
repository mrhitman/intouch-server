import { Router } from 'express';
import { authenticate } from 'passport';
import * as joi from 'joi';
import validate from '../../middlewares/joi';

const router = Router();

const schema = joi.object()
    .keys({
        id: joi.number().required(),
        friend_id: joi.number().required(),
    });

router.post('/follow', authenticate('jwt', { session: false }), validate(schema), require('./follow').default);
router.post('/unfollow', authenticate('jwt', { session: false }), validate(schema), require('./unfollow').default);

export default router;