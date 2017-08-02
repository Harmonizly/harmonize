import Google from 'services/auth/models/google';
import Exception, { handleAuthError } from 'services/auth/exception';
import User from 'services/auth/models/user';
import {
  GENERAL_ERROR,
  GOOGLE_ACCOUNT_NOT_FOUND,
  SOCIAL_OATUH_NOT_CONFIGURED
} from 'services/auth/exception/codes';

  /**
   * Strategy for user authentication with Google
   * @param  { Object } request - Request object
   * @param  { Object } accessToken - Access token data
   * @param  { Object } refreshToken - Refresh token data
   * @param  { Object } profile - User profile data
   * @param  { Function } done - Callback
   * @return { Promise<*> } A promise that resolves by calling callback with
   * user data or rejects by calling util function with provided error
   */
export default async (request, accessToken, refreshToken, profile, done) => {
  try {
      // If the user is authenticated, update/link their user data
    let user = request.user;
    let googleAccount;
    if (user) {
      googleAccount = await Google.save(profile);
      if (!googleAccount) {
        throw new Exception(
          GENERAL_ERROR(`Failed to link the Google Account ${profile.id} to the user '${user.username}'`)
        );
      }
      await Google.link(user);
    } else {
      googleAccount = await Google.where({ id: profile.id });
      if (!googleAccount) {
        throw new Exception(GOOGLE_ACCOUNT_NOT_FOUND);
      }
      user = await User.where({ id: user.id });
      if (!user) {
        throw new Exception(SOCIAL_OATUH_NOT_CONFIGURED);
      }
    }
    return done(null, user);
  } catch (e) {
    return handleAuthError(e, done);
  }
};
