// @flow

import Logger from 'server/utils/logger';

const LOGGER: Object = Logger.get('root');

/**
 * Class representing Logger Middleware
 * @extends AbstractMiddleware
 */
export default function (request: Object, response: Object, next: Function): void {
  LOGGER.info({
    method: request.method,
    url: request.url,
    headers: request.headers
  });
  next();
}
