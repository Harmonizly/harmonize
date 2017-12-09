import Auth0Strategy from 'passport-auth0';
import passport from 'server/utils/passport';

/**
 * [auth description]
 * @param  {[type]} app    [description]
 * @param  {[type]} config [description]
 * @return {[type]}        [description]
 */
export default function auth0(app: Object, config: Object): void {
  // Configure Passport to use Auth0
  const strategy = new Auth0Strategy(
    config.apis.auth0,
    (accessToken: string, refreshToken: string, extraParams: any, profile: ?Object, done: Function): void => {
      return done(null, profile);
    },
  );

  passport.use('auth0', strategy);

  passport.serializeUser((user: Object, done: Function): void => {
    done(null, user);
  });

  passport.deserializeUser((user: Object, done: Function): void => {
    done(null, user);
  });

  app.use(passport.initialize());
  app.use(passport.session());
}
