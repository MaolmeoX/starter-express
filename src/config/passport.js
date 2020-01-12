import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import UserModel from '../models/user';
import { jwtSecret } from '../utils/secrets';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
};

passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    const user = await UserModel.findOne({ email: payload.email });

    if (user) {
      return done(null, user);
    }
    return done(new Error('Bad credentials'));
  })
);
