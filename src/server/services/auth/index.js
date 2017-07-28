import config from 'config';
import passport from 'services/auth/passport';
import session from 'services/auth/middleware/session';

/**
 * [description]
 * @param  {[type]} app [description]
 * @return {[type]}     [description]
 */
export default function(app: Object): Object {
  const authConfig: Object = config.get('auth');
  app.use(session(authConfig.session));

  const configuredPassport: Object = passport(authConfig.passport);
  app.use(configuredPassport.initialize());
  app.use(configuredPassport.session());
  app.set('passport', configuredPassport);
  return app;
}
