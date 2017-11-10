import Auth0Api from 'client/lib/apis/auth0';
import config from 'client/lib/utils/config';

let apisStore: ?Object = null;

/**
 * [generateApis description]
 * @return {Boolean} [description]
 */
function generateApis(): Object {
  return {
    auth0: new Auth0Api(config.auth.auth0)
  };
}

/**
 * [generateApis description]
 * @param  {[type]}  state [description]
 * @return {Boolean}       [description]
 */
export default function apis(name: string = 'all'): Object {
  if (apisStore == null) {
    apisStore = generateApis();
  }

  return (name === 'all') ? apisStore : apisStore[name];
}
