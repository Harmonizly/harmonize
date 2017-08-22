import passport from 'server/passport';

/**
 * Calls authenticate function on passport using facebook strategy and passing scope as option
 * @type { Object }
 */
export const authenticateAccount = passport.authenticate('facebook', {
  scope: ['email', 'public_profile']
});

/**
 * Calls authenticate function on passport using facebook strategy and passing redirection options
 * @type { Object }
 */
export const authenticateAccountCallback = passport.authenticate('facebook', {
  failureRedirect: '/auth/facebook/connect',
  failureFlash: true,
});

/**
 * Calls authorize function on passport using facebook strategy and passing scope as option
 * @type { Object }
 */
export const connectAccount = passport.authorize('facebook', {
  scope: ['email', 'public_profile']
});

/**
 * Calls authorize function on passport using facebook strategy and passing redirection options
 * @type { Object }
 */
export const connectAccountCallback = passport.authorize('facebook', {
  failureRedirect: '/auth/facebook/connect',
  failureFlash: true,
});
