import config from 'config';

import doc from 'configuration/swagger.yaml';

import * as swaggerSecurityHandlers from 'server/api/security';

import { Server } from 'jarvis';

import { render } from 'server/api/controllers/render';
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
  async initialize(app: Object): void {
    if (process.env.NODE_ENV === 'development') {
      this.logger.info('In development mode. Using webpack dev middleware...');
      app.use(webpackDevMiddleware);
      app.use(webpackHotMiddleware);
    }

    // Setup all swagger routes
    await this.initSwagger(doc, {
      security: swaggerSecurityHandlers,
    });

    // Serve static rendered content on the root URL
    app.get('/', render);
  }
}
