// @flow

import Exception, { handleAuthError } from 'services/auth/exception';
import Logger from 'services/auth/utils/logger';
import User from 'services/auth/models/user';
import { USER_NOT_FOUND } from 'services/auth/exception/codes';

const LOGGER: Object = Logger.get('auth');

  /**
   * Strategy for user authentication
   * @param  { string } username - Username in the format of an email
   * @param  { string } password - Users password
   * @param  { Function } done - Callback
   * @return { Promise<*> } A promise that resolves by calling callback with
   * user data or rejects by calling util function with provided error
   */
export default async (username, password, done) => {
  try {
    const user = await User.where({ username });
    if (!user) {
      LOGGER.warn(`User not found for username ${username}`);
      throw new Exception(USER_NOT_FOUND);
    }
    const validPassword = await user.verifyPassword(password);
    if (!validPassword) {
      LOGGER.info(`Password validation failed for user ${username}`);
      throw new Exception(USER_NOT_FOUND);
    }
    return done(null, user);
  } catch (e) {
    return handleAuthError(e, done);
  }
};
