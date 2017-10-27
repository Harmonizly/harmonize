import auth0 from 'auth0-js';
import rxjs from 'rxjs';

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
    this.auth0 = auth0.WebAuth(config);
  }

  /**
   * [options description]
   * @type {[type]}
   */
  authorize(options: Object): Object {
    return rxjs.Observable.from(this.auth0.authorize(options));
  }

  /**
   *
   */
  logout(): Object {
    return rxjs.Observable.fromP(this.auth0.logout());
  }
}
