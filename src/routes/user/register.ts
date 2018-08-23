import * as crypto from 'crypto';
import * as moment from 'moment';
import { Profile } from '../../models/profile';
import { User } from '../../models/user';

export default async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    let hash = crypto.createHmac('sha256', process.env.SALT);

    hash.update(password);

    const user = await User
        .query()
        .insert({
            email,
            password: hash.digest('hex'),
            created_at: moment().format(),
        });

    await Profile
        .query()
        .insert({
            user_id: user.id,
            first_name: req.body.first_name,
            middle_name: req.body.middle_name,
            last_name: req.body.last_name,
            gender: req.body.gender,
            home_town: req.body.town,
            relationship: req.body.relationship,
            company: req.body.company,
            language: req.body.language,
            hobbies: req.body.hobbies,
            priorities: req.body.priorities,
            birthday: req.body.birthday,
        });

    res.json(user);
};
