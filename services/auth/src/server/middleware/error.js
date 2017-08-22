// @flow

import Logger from 'server/utils/logger';

const LOGGER: Object = Logger.get('root');

/**
 * [description]
 * @param  {[type]} error    [description]
 * @param  {[type]} request  [description]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
export default function (error: any, request: Object, response: Object): void {
  const status: number = ('status' in error) ? error.status : 500;
  const code: number = ('code' in error) ? error.code : -1;

  LOGGER.error(error);

  switch (status) {
    case 400:
      return response.render('/error/400', {
        message: error.message,
        code
      });
    case 401:
      return response.render('/error/401', {
        message: error.message,
        code
      });
    case 403:
      return response.render('/error/403', {
        code
      });
    case 404:
      return response.render('/error/404', {
        code
      });
    default:
      return response.render('/error/500', {
        code
      });
  }
}
