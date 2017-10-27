// import Auth0Api from 'client/lib/apis/auth0';

let apis: ?Object = null;

/**
 * [generateApis description]
 * @param  {[type]}  state [description]
 * @return {Boolean}       [description]
 */
export function generateApis(state: Object): Object {
  apis = {
    // auth0: new Auth0Api(state.config.auth0)
  };
}

export default apis;
