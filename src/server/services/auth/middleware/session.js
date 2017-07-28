import redisStore from 'connect-redis';
import session from 'express-session';

/**
 * [description]
 * @param  {[type]} config [description]
 * @return {[type]}        [description]
 */
export default function (config: Object): Function {
  const sessionConfig: Object = {};
  return session(sessionConfig);
}
