import passport from 'passport';
import auth0 from 'services/auth/passport/auth0';

/**
 * [description]
 * @param  {[type]} config [description]
 * @return {[type]}        [description]
 */
export default function (config: Object): Object {
  passport.use(auth0(config.auth0);

  // This can be used to keep a smaller payload
  passport.serializeUser(function(user, done) {
    // TODO
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    // TODO
    done(null, user);
  });

  return passport;
};
