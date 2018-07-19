import * as crypto from 'crypto';
import { User } from '../../models/user';
import { Profile } from '../../models/profile';

export default async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    let hash = crypto.createHmac('sha256', process.env.SALT);
    hash.update(password);
    const id = Math.floor((Math.random() * 1000 + 4));

    const user = await User.query()
        .insert({ id, email, password: hash.digest('hex'), created_at: ~~(new Date().getTime() / 1000) });

    const profile = await Profile.query()
        .insert({
            user_id: id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            birthday: req.body.birthday,
        });

    user.profile = profile;
    res.json(user);
};
