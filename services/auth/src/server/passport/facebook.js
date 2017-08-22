import FacebookAccount from 'server/models/facebook';
import FacebookStrategy from 'passport-facebook';
import Exception, { handleAuthError } from 'server/exception';
import {
  GENERAL_ERROR,
  FACEBOOK_ACCOUNT_LINKED,
  FACEBOOK_ACCOUNT_NOT_LINKABLE,
  FACEBOOK_ACCOUNT_NOT_FOUND,
  SOCIAL_OATUH_NOT_CONFIGURED
} from 'server/exception/codes';

/**
 * [description]
 * @param  {[type]} user    [description]
 * @param  {[type]} profile [description]
 * @return {[type]}         [description]
 */
const authFacebookAccount: Function = async function (user: Object, profile: Object): Promise<Object> {
  const facebookAccount: Object = await FacebookAccount.where({ id: profile.id });
  if (!facebookAccount) {
    throw new Exception(FACEBOOK_ACCOUNT_NOT_FOUND);
  }

  const linkedUser: Object = FacebookAccount.getConnectedUser(facebookAccount);
  if (!linkedUser) {
    throw new Exception(SOCIAL_OATUH_NOT_CONFIGURED);
  }

  if (linkedUser.id !== user.id) {
    throw new Exception(FACEBOOK_ACCOUNT_NOT_LINKABLE);
  }

  return linkedUser;
};

/**
 * [description]
 * @param  {[type]} user    [description]
 * @param  {[type]} profile [description]
 * @return {[type]}         [description]
 */
const connectFacebookAccount: Function = async function (user: Object, profile: Object): Promise<Object> {
  // Check if account already exists. If it does and is currently linked, throw error
  // If it does and is not linked, skip save
  // otherwise, proceed
  const id: string = profile.id;
  let facebookAccount: Object = await FacebookAccount.where({ id });

  if (!facebookAccount) {
    facebookAccount = await FacebookAccount.save({ id: profile.id, profile });
    if (!facebookAccount) {
      throw new Exception(
        GENERAL_ERROR(`Failed to link the Facebook Account ${id} to the user '${user.username}'`)
      );
    }

    return await FacebookAccount.connect(facebookAccount, user);
  }

  const linkedUser: Object = FacebookAccount.getConnectedUser(facebookAccount);
  if (!linkedUser) {
    return await FacebookAccount.connect(facebookAccount, user);
  }

  if (linkedUser.id !== user.id) {
    throw new Exception(FACEBOOK_ACCOUNT_NOT_LINKABLE);
  }

  throw new Exception(FACEBOOK_ACCOUNT_LINKED);
};

/**
 * Strategy for user authentication with Facebook
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
      await connectFacebookAccount(user, profile);
    } else {
      await authFacebookAccount(user, profile);
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
  return new FacebookStrategy(config, handler);
}
