import {
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from 'client/lib/constants';


/**
 * [loginFailed description]
 * @param  {[type]} error [description]
 * @return {[type]}       [description]
 */
export function logoutFailure(error: Object): Object {
  return {
    type: LOGOUT_FAILURE,
    payload: {
      authenticated: false,
      error,
    },
  };
}

/**
 * [loggedIn description]
 * @param  {[type]} user [description]
 * @return {[type]}      [description]
 */
export function loggedSuccess(): Object {
  return {
    type: LOGOUT_SUCCESS,
    payload: {
      authenticated: false,
    },
  };
}
