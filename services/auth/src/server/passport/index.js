import config from 'config';
import facebook from 'server/passport/facebook';
import google from 'server/passport/facebook';
import instagram from 'server/passport/facebook';
import local from 'server/passport/local';
import Logger from 'server/utils/logger';
import passport from 'passport';
import User from 'server/models/user';

const PASSPORT_CONFIG: Object = config.auth.passport;
const LOGGER: Object = Logger.get('auth');

passport.use('facebook', facebook(PASSPORT_CONFIG.facebook));
passport.use('google', google(PASSPORT_CONFIG.google));
passport.use('instagram', instagram(PASSPORT_CONFIG.instagram));
passport.use('local', local(PASSPORT_CONFIG.local));

// serializeUser is used by Passport Session to convert the User object
// to a single value that can be later deserialized back to a User object.
passport.serializeUser((user: Object, done: Function): Promise<void> => {
  done(null, user.id);
});

// Given the string id, return the User object back to Passport session
passport.deserializeUser(async (id: string, done: Function): Promise<void> => {
  try {
    const user: Object = await User.where({ id });
    done(null, user);
  } catch (e) {
    done(e);
  }
});

export default passport;
