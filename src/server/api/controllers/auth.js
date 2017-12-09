import Logger from 'server/utils/logger';
import passport from 'server/utils/passport';

const LOGGER: Object = Logger.get('root');

export const login = passport.authenticate('auth0')
