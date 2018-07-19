import { Profile } from '../../models/profile';

export default async (req, res, next) => {
    const id = req.params.id;

    const user = await Profile
        .query()
        .update(req.body)
        .where({ user_id: id });

    res.json(user);
};
