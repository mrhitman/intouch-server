import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import { User } from "../models/user";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SALT
};

export default passport => {
  passport.use(
    new Strategy(opts, async (payload, done) => {
      const user = await User.query().findById(payload.id);
      return user ? done(null, user) : done(null, false);
    })
  );
};
