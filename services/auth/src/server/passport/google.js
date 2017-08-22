import GoogleAccount from 'server/models/google';
import { Strategy } from 'passport-google-oauth20';
import Exception, { handleAuthError } from 'server/exception';
import {
  GENERAL_ERROR,
  GOOGLE_ACCOUNT_LINKED,
  GOOGLE_ACCOUNT_NOT_LINKABLE,
  GOOGLE_ACCOUNT_NOT_FOUND,
  SOCIAL_OATUH_NOT_CONFIGURED
} from 'server/exception/codes';

/**
 * [description]
 * @param  {[type]} user    [description]
 * @param  {[type]} profile [description]
 * @return {[type]}         [description]
 */
const authGoogleAccount: Function = async function (user: Object, profile: Object): Promise<Object> {
  const googleAccount: Object = await GoogleAccount.where({ id: profile.id });
  if (!googleAccount) {
    throw new Exception(GOOGLE_ACCOUNT_NOT_FOUND);
  }

  const linkedUser: Object = GoogleAccount.getConnectedUser(googleAccount);
  if (!linkedUser) {
    throw new Exception(SOCIAL_OATUH_NOT_CONFIGURED);
  }

  if (linkedUser.id !== user.id) {
    throw new Exception(GOOGLE_ACCOUNT_NOT_LINKABLE);
  }

  return linkedUser;
};

/**
 * [description]
 * @param  {[type]} user    [description]
 * @param  {[type]} profile [description]
 * @return {[type]}         [description]
 */
const connectGoogleAccount: Function = async function (user: Object, profile: Object): Promise<Object> {
  // Check if account already exists. If it does and is currently linked, throw error
  // If it does and is not linked, skip save
  // otherwise, proceed
  const id: string = profile.id;
  let googleAccount: Object = await GoogleAccount.where({ id });

  if (!googleAccount) {
    googleAccount = await GoogleAccount.save({ id: profile.id, profile });
    if (!googleAccount) {
      throw new Exception(
        GENERAL_ERROR(`Failed to link the Google Account ${id} to the user '${user.username}'`)
      );
    }

    return await GoogleAccount.connect(googleAccount, user);
  }

  const linkedUser: Object = GoogleAccount.getConnectedUser(googleAccount);
  if (!linkedUser) {
    return await GoogleAccount.connect(googleAccount, user);
  }

  if (linkedUser.id !== user.id) {
    throw new Exception(GOOGLE_ACCOUNT_NOT_LINKABLE);
  }

  throw new Exception(GOOGLE_ACCOUNT_LINKED);
};

/**
 * Strategy for user authentication with Google
 * @param  { Object } request - Request object
 * @param  { Object } accessToken - Access token data
 * @param  { Object } refreshToken - Refresh token data
 * @param  { Object } profile - User profile data
 * @param  { Function } done - Callback
 * @return { Promise<*> } A promise that resolves by calling callback with
 *                        user data or rejects by calling util function
 *                        with provided error
 */
const handler = async function (
  request: Object,
  accessToken: string,
  refreshToken: string,
  profile: Object,
  done: Function
) {
  try {
    // If the user is authenticated, update/link their user data
    const user: Object = request.user;
    if (user) {
      await connectGoogleAccount(user, profile);
    } else {
      await authGoogleAccount(user, profile);
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
  return new Strategy(config, handler);
}
