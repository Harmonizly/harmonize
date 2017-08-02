import Logger from 'server/utils/logger';

const LOGGER = Logger.get('auth');

/**
 * Class representing an Exception
 * @extends Error
 */
export default class Exception extends Error {

  category: string;
  code: number;
  status: number;
  extra: any;

  /**
   * Creates new Error and assigns payload, code, category and status
   * @param  { string|Object } payload - String or object passed to constructor to create Error
   * @param  { number } [code = -1] - Error code
   * @param  { number } [status = 500] - Error status
   */
  constructor(payload: string | Object, code: number = -1, status: number = 500) {

    if (typeof payload !== 'object') {
      payload = {
        category: "N/A",
        code,
        message: payload,
        status
      };
    }
    super();
    this.category = payload.category;
    this.code = payload.code;
    this.message = `${payload.message}${payload.extra ? `. ${payload.extra}` : ''}`;
    this.status = payload.status;
  }
}

/**
 * Handles auth error in case status is 401 or 403
 * @param  { * } e - Error, we expect it to have status which we check against
 * @param  { Function } done - Callback function
 */
export const handleAuthError = function(e: any, done: Function): void {
  LOGGER.error(e);
  if ('status' in e && (e.status === 401 || e.status === 403)) {
    return done(null, false, e);
  }
  return done(e);
};
