import 'module-alias/register';

import config from 'config';
import Server from 'axon';

import router from 'server/api/router';
import { webpackDevMiddleware, webpackHotMiddleware } from 'server/middleware/webpack';


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
    if (process.env.NODE_ENV === 'development') {
      this.logger.info('In development mode. Using webpack dev middleware...');
      app.use(webpackDevMiddleware);
      app.use(webpackHotMiddleware);
    }

    // Serve static rendered content on the root URL
    app.use(router.routes());
    app.use(router.allowedMethods());
  }
}
