export const LOGIN_USER = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

/**
 * [login description]
 * @param  {[type]} username [description]
 * @param  {[type]} password [description]
 * @return {[type]}          [description]
 */
export function loginCreds(username: string, password: string): Object {
  return {
    type: LOGIN_USER,
    authorize: {
      connection: null
    },
    payload: {
      isFetching: true,
      isAuthenticated: false,
      user: {
        username,
        password
      }
    }
  };
}

/**
 * [loggedIn description]
 * @param  {[type]} user [description]
 * @return {[type]}      [description]
 */
export function loggedIn(user: Object): Object {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      isFetching: false,
      isAuthenticated: true,
      user
    }
  };
}

/**
 * [loginFailed description]
 * @param  {[type]} error [description]
 * @return {[type]}       [description]
 */
export function loginFailed(error: Object): Object {
  return {
    type: LOGIN_FAILURE,
    payload: {
      isFetching: false,
      isAuthenticated: false,
      error
    }
  };
}
