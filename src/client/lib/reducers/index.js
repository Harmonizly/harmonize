import { combineReducers } from 'redux';

// App reducers
import account from 'client/lib/reducers/account';
import auth from 'client/lib/reducers/auth';
import user from 'client/lib/reducers/user';

export default combineReducers({
  account,
  auth,
  user
});

// function combineReducers(state: Object, action: Object): Object {
//   console.log(`Incoming state is: ${JSON.stringify(state)}`);
//   return {
//     account: account(state.account, action),
//     auth: account(state.auth, action),
//     user: account(state.user, action),
//   }
// };
//
// export default combineReducers;
