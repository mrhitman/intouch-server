import * as crypto from 'crypto';
import * as moment from 'moment';
import * as joi from 'joi';
import { Profile } from '../../models/profile';
import { User } from '../../models/user';
import HttpError from '../../error';
import { transaction } from 'objection';
import { db } from '../../services/db';

const schema = joi.object()
    .keys({
        email: joi.string().email(),
        password: joi.string(),
        first_name: joi.string(),
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

export default async (req, res, next) => {

    const { errors, values } = await joi.validate(req.body, schema)
    if (errors) {
        return next(new HttpError(JSON.stringify(errors, values), 400));
    }
    const { email, password } = req.body;

    if (await User.query().findOne({ email })) {
        return next(new HttpError('User already exists', 409));
    }

    let hash = crypto.createHmac('sha256', process.env.SALT);
    hash.update(password);

    transaction(db, async trx => {
        const user = await User
            .query(trx)
            .insert({
                email,
                password: hash.digest('hex'),
                created_at: moment().format(),
            });

        await Profile
            .query(trx)
            .insert({
                user_id: user.id,
                first_name: req.body.first_name,
                middle_name: req.body.middle_name,
                last_name: req.body.last_name,
                gender: req.body.gender,
                home_town: req.body.home_town,
                relation: req.body.relation,
                company: req.body.company,
                country: req.body.country,
                city: req.body.city,
                language: req.body.language,
                hobbies: req.body.hobbies,
                priorities: req.body.priorities,
                birthday: req.body.birthday,
            });
        res.status(201)
            .end();
    });
};
