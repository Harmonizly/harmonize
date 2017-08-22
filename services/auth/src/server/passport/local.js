import Exception, { handleAuthError } from 'server/exception';
import LocalStratgey from 'passport-local';
import Logger from 'server/utils/logger';
import User from 'server/models/user';
import { USER_NOT_FOUND } from 'server/exception/codes';

const LOGGER: Object = Logger.get('auth');

  /**
   * Strategy for user authentication
   * @param  { string } username - Username in the format of an email
   * @param  { string } password - Users password
   * @param  { Function } done - Callback
   * @return { Promise<*> } A promise that resolves by calling callback with
   * user data or rejects by calling util function with provided error
   */
const handler = async function (username: string, password: string, done: Function) {
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

/**
 * [description]
 * @param  {[type]} config [description]
 * @return {[type]}        [description]
 */
export default function (config: Object): Function {
  return new LocalStratgey(config, handler);
}
