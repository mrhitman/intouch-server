import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { User } from '../models/user';

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SALT
};

export default passport => {
    passport.use(new Strategy(opts, async (payload, done) => {
        const user = User.query().findOne({ id: payload.id });
        return user ? done(null, user) : done(null, false);
    }));
};
