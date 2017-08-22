import InstagramAccount from 'server/models/instagram';
import InstagramStrategy from 'passport-instagram';
import Exception, { handleAuthError } from 'server/exception';
import {
  GENERAL_ERROR,
  INSTAGRAM_ACCOUNT_LINKED,
  INSTAGRAM_ACCOUNT_NOT_LINKABLE,
  INSTAGRAM_ACCOUNT_NOT_FOUND,
  SOCIAL_OATUH_NOT_CONFIGURED
} from 'server/exception/codes';

/**
 * [description]
 * @param  {[type]} user    [description]
 * @param  {[type]} profile [description]
 * @return {[type]}         [description]
 */
const authInstagramAccount: Function = async function (user: Object, profile: Object): Promise<Object> {
  const instagramAccount: Object = await InstagramAccount.where({ id: profile.id });
  if (!instagramAccount) {
    throw new Exception(INSTAGRAM_ACCOUNT_NOT_FOUND);
  }

  const linkedUser: Object = InstagramAccount.getConnectedUser(instagramAccount);
  if (!linkedUser) {
    throw new Exception(SOCIAL_OATUH_NOT_CONFIGURED);
  }

  if (linkedUser.id !== user.id) {
    throw new Exception(INSTAGRAM_ACCOUNT_NOT_LINKABLE);
  }

  return linkedUser;
};

/**
 * [description]
 * @param  {[type]} user    [description]
 * @param  {[type]} profile [description]
 * @return {[type]}         [description]
 */
const connectInstagramAccount: Function = async function (user: Object, profile: Object): Promise<Object> {
  // Check if account already exists. If it does and is currently linked, throw error
  // If it does and is not linked, skip save
  // otherwise, proceed
  const id: string = profile.id;
  let instagramAccount: Object = await InstagramAccount.where({ id });

  if (!instagramAccount) {
    instagramAccount = await InstagramAccount.save({ id: profile.id, profile });
    if (!instagramAccount) {
      throw new Exception(
        GENERAL_ERROR(`Failed to link the Google Account ${id} to the user '${user.username}'`)
      );
    }

    return await InstagramAccount.connect(instagramAccount, user);
  }

  const linkedUser: Object = InstagramAccount.getConnectedUser(instagramAccount);
  if (!linkedUser) {
    return await InstagramAccount.connect(instagramAccount, user);
  }

  if (linkedUser.id !== user.id) {
    throw new Exception(INSTAGRAM_ACCOUNT_NOT_LINKABLE);
  }

  throw new Exception(INSTAGRAM_ACCOUNT_LINKED);
};

/**
 * Strategy for user authentication with Instagram
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
      await connectInstagramAccount(user, profile);
    } else {
      await authInstagramAccount(user, profile);
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
  return new InstagramStrategy(config, handler);
}
