export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';


/**
 * [login description]
 * @param  {[type]} username [description]
 * @param  {[type]} password [description]
 * @return {[type]}          [description]
 */
export function logout(username: string, password: string): Object {
  return {
    type: LOGOUT,
    payload: {
      isFetching: true,
      isAuthenticated: true
    }
  };
}

/**
 * [loggedIn description]
 * @param  {[type]} user [description]
 * @return {[type]}      [description]
 */
export function loggedOut(): Object {
  return {
    type: LOGOUT_SUCCESS,
    payload: {
      isFetching: false,
      isAuthenticated: false
    }
  };
}

/**
 * [loginFailed description]
 * @param  {[type]} error [description]
 * @return {[type]}       [description]
 */
export function logoutFailed(error: Object): Object {
  return {
    type: LOGOUT_FAILURE,
    payload: {
      isFetching: false,
      isAuthenticated: false,
      error
    }
  };
}
