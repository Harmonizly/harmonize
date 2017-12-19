import auth from 'client/lib/apis/auth';

/**
 * [createApis description]
 * @return {Boolean} [description]
 */
export async function createApis(config: Object): Promise<void> {
  const apis: Object = {};

  apis.auth = await auth(config.auth);

  return apis;
}
