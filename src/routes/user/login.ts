import * as jwt from 'jsonwebtoken';
import { User } from '../../models/user';

export default async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User
        .query()
        .eager('[profile]')
        .findOne({ email, password });

    if (!user) {
        return next(new Error(`No such user`));
    }
    const token = jwt.sign({
        id: user.id
    }, 'salt', {expiresIn: '1h'});

    res.json({
        token: `Bearer ${token}`,
        user
    });
};