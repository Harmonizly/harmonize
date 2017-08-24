import passport from 'server/passport';

/**
 * [description]
 * @param  {[type]} request  [description]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
export const login = function (request: Object, response: Object): void {
  return response.send({ message: 'ok' });
};

/**
 * [description]
 * @param  {[type]} request  [description]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
export const logout = function (request: Object, response: Object): void {
  request.logout();
  // TODO clear session and create new one
  // TODO set flash message
  return response.redirect('/login');
};

/**
 * [description]
 * @param  {[type]} request  [description]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
export const render = function (request: Object, response: Object): void {
  console.log('inside login.render function');
  return response.render('/auth/login');
};
