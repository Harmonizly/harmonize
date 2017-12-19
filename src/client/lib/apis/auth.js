import Swagger from 'swagger-client';

let client: ?Object = null;

/**
 * [auth description]
 * @return {[type]} [description]
 */
export default function auth(config): Promise<Object> {
  if (client) {
    return Promise.resolve(client);
  }

  return new Promise(async (resolve: Function, reject: Function): void => {
    try {
      console.log(config.auth);
      debugger;
      client = await Swagger(config.auth);
      return resolve(client);
    } catch (e) {
      return reject(e);
    }
  });
}
