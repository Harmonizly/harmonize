import Login from 'client/pages/login';
import PasswordReset from 'client/pages/password/reset';
import PasswordResetRequest from 'client/pages/password/resetRequest';
import Error400 from 'client/pages/error/400';
import Error401 from 'client/pages/error/401';
import Error403 from 'client/pages/error/403';
import Error404 from 'client/pages/error/404';
import Error500 from 'client/pages/error/500';
import React from 'react';
import {
  Redirect,
  Route,
  Switch
} from 'react-router';

/**
 * [path description]
 * @type {String}
 */
// TODO handle logged in
export default (
  <Switch>
    <Route exact path="/auth/login" component={Login} />
    <Route exact path="/auth/password/reset" component={PasswordReset} />
    <Route exact path="/auth/password/reset/request" component={PasswordResetRequest} />
    <Route exact path="/error/400" component={Error400} />
    <Route exact path="/error/401" component={Error401} />
    <Route exact path="/error/403" component={Error403} />
    <Route exact path="/error/404" component={Error404} />
    <Route exact path="/error/500" component={Error500} />
    <Redirect from="/auth" to="/auth/login" />
    <Redirect from="/" to="/auth/login" />
  </Switch>
);
