import passport from 'services/auth/passport';

/**
 * [authorized description]
 * @type {[type]}
 */
export authorized = passport.authenticate('auth0', {
  successRedirect: '/home',
  failureRedirect: '/login',
  failureFlash: true
});

/**
 * [description]
 * @param  {[type]} request  [description]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
export const login = passport.authenticate('auth0', {
  successRedirect: '/home',
  failureRedirect: '/login',
  failureFlash: true
});

/**
 * [description]
 * @param  {[type]} request  [description]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
export default logout = function(request: Object, response: Object): void {
  request.logout();
  // TODO clear session and create new one
  // TODO set flash message
  return response.redirect('/login');
}
