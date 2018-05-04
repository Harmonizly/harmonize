import config from 'config';
import Server from 'axon';

import router from 'server/api/router';
import { ensureAuthenticated } from 'server/middleware/aaa';
import { webpackDevMiddleware } from 'server/middleware/webpack';


/**
 * [app description]
 * @type {[type]}
 */
export default class HarmonyServer extends Server {
  /**
   * [constructor description]
   * @param  {[type]} void [description]
   * @return {[type]}      [description]
   */
  constructor(): void {
    super(config);
  }

  /**
   * Attach middleware & controllers to the Express app.
   * Note: Order matters here.
   * @param  {[type]}  void [description]
   * @return {Promise}      [description]
   */
  async configure(app: Object): void {
    app.use(ensureAuthenticated);

    if (process.env.NODE_ENV === 'development') {
      this.logger.info('Using webpack dev middleware...');
      app.use(webpackDevMiddleware);
    }
  }

  /**
   *
   */
  createRouter(): Object {
    return router;
  }
}
