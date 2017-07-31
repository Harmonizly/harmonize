import bodyParser from 'body-parser';
import config from 'config';
import express from 'express';
import flash from 'connect-flash-plus';
import fs from 'fs';
import https from 'https';
import process from 'process';
import swagger from 'swagger-node-runner';
import SwaggerUi from 'swagger-tools/middleware/swagger-ui';

import ErrorMiddleware from 'services/friends/middleware/error';
import Logger from 'services/friends/utils/logger';
import LoggingMiddleware from 'services/friends/middleware/logging';
import StaticMiddleware from 'services/friends/middleware/static';
import swaggerConfig from 'services/friends/config/swagger.yaml';

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
    this.config = config.get('server');

    try {
      this.configure();

      // Initialize the express server
      this.app = express();
    } catch (e) {
      if (this.logger) {
        this.logger.error(e);
      } else {
        /* eslint-disable no-console */
        console.error(e);
      }
      this.destroy();
      throw e;
    }
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
   * [initSwagger description]
   * @param  {[type]} Promise [description]
   * @return {[type]}        [description]
   */
  initSwagger(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      swagger.create({
        appRoot: process.cwd(),
        swagger: swaggerConfig
      }, (error: any, runner: Object): void => {
        if (error) {
          return reject(error);
        }

        const middleware = runner.expressMiddleware();

        // Add swagger-ui (This must be before swaggerExpress.register)
        this.app.use(SwaggerUi(middleware.runner.swagger));

        // install middleware
        middleware.register(this.app);

        return resolve();
      });
    });
  }

  /**
   * Attach middleware to the Express app.
   * Note: Order matters here.
   * @param  {[type]}  void [description]
   * @return {Promise}      [description]
   */
  async middleware(): void {
    // Initialize body parser before routes or body will be undefined
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));
    this.app.use(bodyParser.json());
    this.app.use(flash({ unsafe: true }));

    // Configure Request logging
    const loggingMiddleware = new LoggingMiddleware(this.config, this.logger);
    loggingMiddleware.mount(this.app);

    // Configure the Express Static middleware
    const staticMiddleware = new StaticMiddleware(this.config, this.logger);
    staticMiddleware.mount(this.app);

    await this.initSwagger();

    // Configure the request error handling
    const errorMiddleware = new ErrorMiddleware(this.config, this.logger);
    errorMiddleware.mount(this.app);
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
      await this.middleware();
      return (this.config.get('secure')) ? this.startHttps(cb) : this.startHttp(cb);
    } catch (e) {
      if (this.logger) {
        this.logger.error(e);
      } else {
        /* eslint-disable no-console */
        console.error(e);
      }
      this.destroy();
      throw e;
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
    this.app.all('*', function (request: Object, response: Object, next: Function) {
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
