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
