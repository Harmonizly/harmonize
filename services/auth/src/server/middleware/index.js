// @flow

import config from 'config';
import Exception from 'server/exception';
import Logger from 'server/utils/logger';
import { NOT_YET_IMPLEMENTED, NOT_ALLOWED, NOT_AUTHORIZED } from 'server/exception/codes';

const LOGGER: Object = Logger.get('root');

/**
 * Class representing AbstractMiddleware which is a super class that other middlewares extend
 */
export default class AbstractMiddleware {

  config: Object;
  logger: Object;

  /**
   * Constructor that assigns configuration and logger settings to a class properties
   * @param { Object } config - Configuration object
   * @param { Object } logger - Logger settings
   */
  constructor(config: Object, logger: Object): void {
    this.config = config;
    this.logger = logger;
  }

  /**
   * Mounting point of every middleware, makes sure all middlewares implement this method
   * @param { Object } app - App object which is Express server
   * @throws { Exception } If this method is not implemented
   */
  mount(app: Object): void {
    throw new Exception(NOT_YET_IMPLEMENTED);
  }
}
