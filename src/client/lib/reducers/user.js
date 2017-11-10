import { DEFAULT_INITIAL_USER_STATE } from 'client/lib/constants';

/**
 * [description]
 * @param  {[type]} state  [description]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
export default function user(state: Object = DEFAULT_INITIAL_USER_STATE, action: Object): Object {
  switch (action.type) {
    default:
      return state;
  }
}
