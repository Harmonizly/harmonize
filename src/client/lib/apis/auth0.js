import auth0js from 'auth0-js';

/**
 * [auth0 description]
 * @type {[type]}
 */
export default class Auth0Api {
  auth0: Object;

  /**
   * [config description]
   * @type {[type]}
   */
  constructor(config: Object): void {
    this.auth0 = new auth0js.WebAuth(config);
  }

  /**
   * [options description]
   * @type {[type]}
   */
  login(options: Object = {}): Object {
    return this.auth0.authorize(options);
  }

  /**
   *
   */
  logout(): Object {
    return this.auth0.logout();
  }
}
