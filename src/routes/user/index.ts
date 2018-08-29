import { Router } from 'express';
import * as joi from 'joi';
import { authenticate } from 'passport';
import validate from '../../middlewares/joi';

const router = Router();
const opts = { session: false };

router.post('/login', require('./login').default);
router.post('/logout', authenticate('jwt', opts), require('./logout').default);
router.post('/refresh', require('./refresh').default);

const register = joi.object()
    .keys({
        email: joi.string().email().required(),
        password: joi.string().required(),
        first_name: joi.string().required(),
        middle_name: joi.string(),
        last_name: joi.string(),
        gender: joi.number(),
        home_town: joi.string().allow(''),
        relation: joi.number(),
        company: joi.string().allow(''),
        country: joi.string().allow(''),
        city: joi.string(),
        language: joi.string(),
        hobbies: joi.string().allow(''),
        priorities: joi.string().allow(''),
        birthday: joi.string(),
    });

router.post('/register', validate(register), require('./register').default);
router.route('/profile/:id')
    .get(require('./get-profile').default)
    .post(authenticate('jwt', opts), require('./update-profile').default);

router.post('/profile/:id/photo', authenticate('jwt', opts), require('./update-profile-image').default);
router.get('/get-friends/:id', require('./get-friends').default);

export default router;