import * as jwt from 'jsonwebtoken';
import * as uuid from 'uuid';
import HttpError from '../../error';
import { RefreshToken } from '../../models/refresh-token';

export default async (req, res, next) => {
    const { token, user_id } = req.body;
    let refreshToken = await RefreshToken
        .query()
        .findOne({ user_id, token });

    if (!refreshToken) {
        return next(new HttpError('Invalid refresh token', 404));
    }

    await refreshToken
        .$query()
        .update({ user_id, token: uuid() })
        .execute();

    const newToken = jwt.sign({ id: user_id }, process.env.SALT, { expiresIn: '1h' });

    res.json({
        token: newToken,
        refreshToken,
    });
};