import { User } from '../../models/user';

export default async (req, res, next) => {
    const id = req.params.id;
    const user = await User
        .query()
        .eager({ profile: true })
        .findById(id);
    if (!user) {
        return res
            .status(404)
            .end();
    }
    res.json(user);
};
