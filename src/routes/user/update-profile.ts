import { Profile } from '../../models/profile';
import * as moment from 'moment';

export default async (req, res, next) => {
    const id = req.params.id;

    req.body.birthday = moment(req.body.birthday).unix();
    console.log(req.body);
    const user = await Profile
        .query()
        .update(req.body)
        .where({ user_id: id });

    res.json(user);
};
