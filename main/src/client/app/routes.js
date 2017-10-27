import React from 'react';
import { connect } from 'react-redux';
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

// Components
import HomeContainer from 'client/lib/containers/home'
import InternalServerErrorContainer from 'client/lib/containers/error/500';
import LoginContainer from 'client/lib/containers/auth/login';
import LogoutContainer from 'client/lib/containers/auth/logout';
import NotFoundContainer from 'client/lib/containers/error/404';

/**
 * [description]
 * @param  {[type]} component [description]
 * @param  {[type]} rest      [description]
 * @return {[type]}           [description]
 */
const AuthorizedRoute: Function = function({ component: Component, isAuthenticated, ...rest }): React$Element {
  return (
    <Route {...rest} render={(props): React$Element => {
        return isAuthenticated ?
            (<Component {...props} />) :
            (<Redirect to={{
                pathname: '/login',
          state: { from: props.location }
        }}/>);
    }}/>
  );
};

/**
 * [routes description]
 * @param  {Boolean} isAuthenticated [description]
 * @return {[type]}                  [description]
 */
class Routes extends React.Component {

  /**
   * [isAuthenticated description]
   * @type {Object}
   */
  render(): React$Element {
    return (
      <Switch>
          <Redirect exact from='/' to='/app'/>
          <AuthorizedRoute
              exact
              isAuthenticated={this.props.store.auth.isAuthenticated}
              path="/app"
              component={HomeContainer}
          />
          <Route path="/app/login" component={LoginContainer} />
          <Route path="/app/logout" component={LogoutContainer} />
          <Route path="/app/error/404" component={NotFoundContainer} />
          <Route path="/app/error/500" component={InternalServerErrorContainer} />
      </Switch>
    );
  }
};

export default connect((store: Object) => {
  return {
    store
  }
})(Routes);
