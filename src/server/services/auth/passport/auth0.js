import Auth0Strategy from 'passport-auth0';

/**
 * [domain description]
 * @type {String}
 */
const auth0Strategy: Function = function (config: Object): Object {
  return Auth0Strategy({
    domain: config.domain,
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: config.callbackURL
  }, (accessToken, refreshToken, extraParams, profile, done) => {
      // accessToken is the token to call Auth0 API (not needed in the most cases)
      // extraParams.id_token has the JSON Web Token
      // profile has all the information from the user
    return done(null, profile);
  });
};
export default auth0Strategy;
