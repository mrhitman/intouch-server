import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import * as uuid from 'uuid';
import HttpError from '../../error';
import { User } from '../../models/user';

export default async (req, res, next) => {
    const { email, password } = req.body;

    let hash = crypto.createHmac('sha256', process.env.SALT);
    hash.update(password);

    const user = await User
        .query()
        .eager('[profile]')
        .findOne({ email, password: hash.digest('hex') });

    if (!user) {
        return next(new HttpError(`No such user`, 403));
    }
    const token = jwt.sign({ id: user.id }, process.env.SALT, { expiresIn: '1h' });

    res.json({
        token,
        refreshToken: uuid(),
        user,
    });
};