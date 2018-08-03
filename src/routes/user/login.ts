import * as jwt from 'jsonwebtoken';
import { User } from '../../models/user';
import * as crypto from 'crypto';

export default async (req, res, next) => {
    const { email } = req.body;

    const password = req.body.password;
    let hash = crypto.createHmac('sha256', process.env.SALT);
    hash.update(password);

    const user = await User
        .query()
        .eager('[profile]')
        .findOne({ email, password: hash.digest('hex') });

    if (!user) {
        return next(new Error(`No such user`));
    }
    const token = jwt.sign({
        id: user.id
    }, process.env.SALT, { expiresIn: '1h' });

    res.json({
        token: `Bearer ${token}`,
        user
    });
};