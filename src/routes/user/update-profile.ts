import { Profile } from '../../models/profile';
import * as moment from 'moment';

export default async (req, res) => {
    const id = req.params.id;

    req.body.birthday = moment(req.body.birthday).format('YYYY-MM-DD');
    req.body.language = req.body.language.join();
    const user = await Profile
        .query()
        .update(req.body)
        .where({ user_id: id });

    res.json(user);
};
