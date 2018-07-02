import { User } from '../../models/user';

export default async (req, res) => {
    const user = await User
        .query()
        .where({ id: 1 });
    res.json(user);
};