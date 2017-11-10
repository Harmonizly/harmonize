import { DEFAULT_INITIAL_ACCOUNT_STATE } from 'client/lib/constants';

/**
 * [description]
 * @param  {[type]} state  [description]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
export default function account(state: Object = DEFAULT_INITIAL_ACCOUNT_STATE, action: Object): Object {
  switch (action.type) {
    default:
      return state;
  }
}
