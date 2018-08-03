import { Profile } from '../../models/profile';
import * as moment from 'moment';

export default async (req, res, next) => {
    const id = req.params.id;

    req.body.birthday = moment(req.body.birthday).unix();
    req.body.language = req.body.language.join();
    const user = await Profile
        .query()
        .update(req.body)
        .where({ user_id: id });

    res.json(user);
};
