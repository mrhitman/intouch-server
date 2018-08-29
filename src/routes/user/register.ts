import * as crypto from 'crypto';
import * as moment from 'moment';
import HttpError from '../../error';
import { Profile } from '../../models/profile';
import { User } from '../../models/user';
import { transaction } from '../../services/db';

export default async (req, res, next) => {

    const { email, password } = req.body;
    if (await User.query().findOne({ email })) {
        return next(new HttpError('User already exists', 409));
    }

    let hash = crypto.createHmac('sha256', process.env.SALT);
    hash.update(password);

    await transaction(async trx => {
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
