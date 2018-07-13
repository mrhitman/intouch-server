import { User } from '../../models/user';

export default async (req, res, next) => {
    const id = req.query.id;

    if (!id) {
       return next(new Error('No user id param'));
    }

    const user = await User
        .query()
        .eager({ profile: true })
        .where({ id });
    res.json(user);
};
