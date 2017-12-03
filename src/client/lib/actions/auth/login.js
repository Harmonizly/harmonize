import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from 'client/lib/constants';


/**
 * [loginFailed description]
 * @param  {[type]} error [description]
 * @return {[type]}       [description]
 */
export function loginFailed(error: Object): Object {
  return {
    type: LOGIN_FAILURE,
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
export function loginSuccess(data: Object): Object {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      authenticated: true,
      ...data,
    },
  };
}
