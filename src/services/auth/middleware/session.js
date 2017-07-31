import redisStore from 'connect-redis';
import session from 'express-session';

/**
 * [description]
 * @param  {[type]} config [description]
 * @return {[type]}        [description]
 */
export default function (config: Object): Function {
  const sessionConfig: Object = Object.assign({}, config);

  // TODO find a better way then this
  const store: Object = sessionConfig.store;
  if (store) {
    switch (store.type) {
      case 'redis':
        sessionConfig.store = new (redisStore(session))(store);
        break;
      default:
        delete sessionConfig.store;
    }
  }
  return session(sessionConfig);
}
