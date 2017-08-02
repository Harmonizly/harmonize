import passport from 'passport';
import facebook from 'services/auth/passport/facebook';
import google from 'services/auth/passport/facebook';
import instagram from 'services/auth/passport/facebook';
import local from 'services/auth/passport/local';
import Logger from 'services/auth/utils/logger';

const logger = Logger.get('auth');

/**
 * [description]
 * @param  {[type]} config [description]
 * @return {[type]}        [description]
 */
export default function (config: Object): Object {
  passport.use('facebook', facebook);
  passport.use('google', google);
  passport.use('instagram', instagram);
  passport.use('local', local);

  // serializeUser is used by Passport Session to convert the User object
  // to a single value that can be later deserialized back to a User object.
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Given the string id, return the User object back to Passport session
  passport.deserializeUser(async (id, done) => {
    try {
      // const user = await models.User.findById(id);
      done(null, user);
    } catch (e) {
      done(e);
    }
  });

  return passport;
};
