import { combineEpics } from 'redux-observable';

// App epics
import { loginEpic, logoutEpic } from 'client/lib/epics/auth';

export default combineEpics(loginEpic, logoutEpic);
