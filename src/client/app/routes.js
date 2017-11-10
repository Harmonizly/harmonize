import React from 'react';
import PropTypes from 'prop-types';

// Components
import ConditionalRoute from 'client/lib/components/conditionalRoute';
import DashboardPage from 'client/pages/dashboard';
import HomePage from 'client/pages/home';
import InternalServerErrorPage from 'client/pages/error/500';
import NotFoundPage from 'client/pages/error/404';

import { connect } from 'react-redux';
import {
  Route,
  Switch
} from 'react-router-dom';

/**
 * [routes description]
 * @param  {Boolean} isAuthenticated [description]
 * @return {[type]}                  [description]
 */
class Routes extends React.Component {
  static propTypes: Object = {
    auth: PropTypes.shape({
      isAuthenticated: PropTypes.bool
    })
  };

  static defaultProps: Object = {
    auth: {}
  };

  /**
   * [isAuthenticated description]
   * @type {Object}
   */
  render(): React$Element {
    return (
      <Switch>
        <ConditionalRoute
          exact
          condition={!(this.props.auth.isAuthenticated)}
          path="/"
          satisfied={HomePage}
          unsatisfied={DashboardPage}
        />
        <ConditionalRoute
          exact
          condition={this.props.auth.isAuthenticated}
          path="/dashboard"
          satisfied={DashboardPage}
          unsatisfied="/"
        />
        <Route exact path="/error/404" component={NotFoundPage} />
        <Route exact path="/error/500" component={InternalServerErrorPage} />
      </Switch>
    );
  }
}

export default connect((store: Object) => {
  return {
    auth: store.auth
  };
})(Routes);
