import apis from 'client/lib/apis';
import { LOGIN_USER } from 'client/lib/actions/auth/login';
import { LOGOUT } from 'client/lib/actions/auth/logout';

/**
 * [loginEpic description]
 * @param  {[type]} action$ [description]
 * @return {[type]}         [description]
 */
export function loginEpic(action$: Object): void {
  return action$.ofType(LOGIN_USER).mergeMap((action) => {
    apis.auth0.authorize(action.authorize);
  });
}

/**
 * [logoutEpic description]
 * @param  {[type]} action$ [description]
 * @return {[type]}         [description]
 */
export function logoutEpic(action$: Object): void {
  return action$.ofType(LOGOUT).mergeMap((action) => {
    apis.auth0.logout();
  });
}
