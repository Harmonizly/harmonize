import bodyParser from 'body-parser';
import config from 'config';
import * as controllers from 'server/controllers';
import errorMiddleware from 'server/middleware/error';
import express from 'express';
import flash from 'connect-flash-plus';
import fs from 'fs';
import https from 'https';
import Logger from 'server/utils/logger';
import loggingMiddleware from 'server/middleware/logging';
import passport from 'server/passport';
import process from 'process';
import renderMiddleware from 'server/middleware/render';
import swaggerConfig from 'configuration/swagger.yaml';
import swaggerMiddleware from 'server/middleware/swagger';

/**
 * [app description]
 * @type {[type]}
 */
export default class Server {
  app: Function;
  config: Object;
  logger: Object;

  /**
   * [constructor description]
   * @param  {[type]} void [description]
   * @return {[type]}      [description]
   */
  constructor(): void {
    this.config = config.server;

    // Initialize the express server
    this.app = express();

    this.configure();
  }

  /**
   * [logger description]
   * @type {[type]}
   */
  configure(): void {
    this.logger = Logger.get('root');

    // Catches ctrl+c event
    this.boundSigIntHandler = ::this.sigIntHandler;
    process.on('SIGINT', this.boundSigIntHandler);

    // Catches uncaught exceptions
    this.boundUncaughtExceptionHandler = ::this.unhandledExceptionHandler;
    process.on('uncaughtException', this.boundUncaughtExceptionHandler);
  }

  /**
   * [destroy description]
   * @param  {[type]} void [description]
   * @return {[type]}      [description]
   */
  destroy(): void {
    this.removeEventListeners();
  }

  /**
   * Attach middleware to the Express app.
   * Note: Order matters here.
   * @param  {[type]}  void [description]
   * @return {Promise}      [description]
   */
  async initMiddleware(): void {
    // Initialize body parser before routes or body will be undefined
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());

    // Add flash message capabilities
    this.app.use(flash({ unsafe: true }));

    // Configure Request logging
    this.app.use(loggingMiddleware);

    // Override the default rendering function
    this.app.use(renderMiddleware);

    // Configure the Express Static middleware
    const assetsConfig = this.config.assets;

    this.app.use('/', express.static(assetsConfig.staticRoot));
    this.app.use('/', express.static(assetsConfig.distRoot));

    // Configure passport.js
    this.app.use(passport.initialize());
    this.app.use(passport.session());

    // Configure the Swagger Middleware by using Sway
    const swayMiddleware: Function = await swaggerMiddleware(swaggerConfig, controllers);

    this.app.use(swayMiddleware);

    // Configure the request error handling
    this.app.use(errorMiddleware);

    // Default fallback to 404 if the current route could not be handled
    this.app.all('*', (request: Object, response: Object): void => {
      response.render('error/404');
    });
  }

  /**
   * [callback description]
   * @type {Function}
   */
  async start(callback: Function | null = null): void {
    if (!this.app) {
      throw new Error('Cannot start server: the express instance is not defined');
    }

    const cb = () => {
      if (callback != null) {
        callback();
      }

      const message = `Server listening at ${this.config.get('hostname')}:${this.config.get('port')}...`;

      this.logger.info(message);
    };

    try {
      // Mount middleware
      await this.initMiddleware();

      return (this.config.get('secure')) ? this.startHttps(cb) : this.startHttp(cb);
    } catch (e) {
      if (this.logger) {
        this.logger.error(e);
      } else {
        /* eslint-disable no-console */
        console.error(e);
      }
      this.destroy();
      return process.exit(-1);
    }
  }

  /**
   * [startHttp description]
   * @param  {[type]} void [description]
   * @return {[type]}      [description]
   */
  startHttp(callback: Function): void {
    return this.app.listen(this.config.get('port'), this.config.get('hostname'), this.config.get('backlog'), callback);
  }

  /**
   * [startHttps description]
   * @param  {[type]} void [description]
   * @return {[type]}      [description]
   */
  startHttps(callback: Function): void {
    this.app.all('*', (request: Object, response: Object, next: Function): void => {
      if (request.secure) {
        return next();
      }
      return response.redirect(`https://${request.hostname}:${this.config.get('port')}${request.url}`);
    });

    const sslConfig = this.config.get('ssl');
    const httpsConfig = Object.assign({}, sslConfig, {
      key: fs.readFileSync(sslConfig.get('key')),
      cert: fs.readFileSync(sslConfig.get('cert'))
    });

    return https.createServer(httpsConfig, this.app)
      .listen(this.config.get('port'), this.config.get('hostname'), this.config.get('backlog'), callback);
  }

  /**
   * [stop description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  stop(callback: Function | null = null): void {
    if (this.app && this.app.server) {
      this.app.server.close(() => {
        if (callback != null && typeof callback === 'function') {
          callback();
        }
        this.logger.info(`Server (${this.config.hostname}:${this.config.port}) stopping...`);
      });
    }
    this.destroy();
  }

  /**
   * [sigIntHandler description]
   * @param  {[type]} void [description]
   * @return {[type]}      [description]
   */
  sigIntHandler(): void {
    if (this.logger) {
      this.logger.info('Captured ctrl-c');
    }

    this.stop();
    process.exit(1);
  }

  /**
   * [removeEventListeners description]
   * @param  {[type]} void [description]
   * @return {[type]}      [description]
   */
  removeEventListeners(): void {
    process.removeListener('SIGINT', this.boundSigIntHandler);
    process.removeListener('uncaughtException', this.boundUncaughtExceptionHandler);
  }

  /**
   * [unhandledExceptionHandler description]
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
  unhandledExceptionHandler(e: Error): void {
    if (this.logger) {
      this.logger.error(`Unhandled Exception. ${e}`);
    }
  }
}
