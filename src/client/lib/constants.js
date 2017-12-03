/**
 *
 */

export const DEFAULT_ENV = 'development';

// ACTIONS
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

// DEFAULT STATES
export const DEFAULT_ACCOUNT_STATE = {
  error: null,
};
export const DEFAULT_AUTH_STATE = {
  authenticated: false,
  error: null,
};
export const DEFAULT_USER_STATE = {
  error: null,
  username: '',
  name: {
    firstName: '',
    lastName: '',
  },
};
