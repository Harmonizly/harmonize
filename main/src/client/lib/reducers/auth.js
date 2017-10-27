import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from 'client/lib/actions/auth/login';
import { DEFAULT_INITIAL_STATE } from 'client/lib/constants';

/**
 * [description]
 * @param  {[type]} state  [description]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
export default function auth(state: Object = DEFAULT_INITIAL_STATE, action: Object): Object {
  switch (action.type) {
      case LOGIN_SUCCESS:
        return {
          ...state,
          ...action.payload
        };
      case LOGIN_FAILURE:
        return {
          ...state,
          ...action.payload
        };
      case LOGOUT_SUCCESS:
        return {
          ...state,
          ...action.payload
        };
      case LOGOUT_FAILURE:
        return {
          ...state,
          ...action.payload
        };
      default:
        return state;
  }
};
