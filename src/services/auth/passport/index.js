import passport from 'passport';
import facebook from 'services/auth/passport/facebook';
import google from 'services/auth/passport/facebook';
import instagram from 'services/auth/passport/facebook';
import local from 'services/auth/passport/local';

/**
 * [description]
 * @param  {[type]} config [description]
 * @return {[type]}        [description]
 */
export default function (config: Object): Object {
  passport.use(facebook(config.facebook);
  passport.use(google(config.google);
  passport.use(instagram(config.instagram);
  passport.use(local(config.local);

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
