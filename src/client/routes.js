import PropTypes from 'prop-types';
import React from 'react';

// Components
import ConditionalRoute from 'client/components/routes/conditionalRoute';
import DashboardPage from 'client/pages/dashboard';
import HomePage from 'client/pages/home';
import InternalServerErrorPage from 'client/pages/error/500';
import NotFoundPage from 'client/pages/error/404';
import PageContainer from 'client/containers/page';

import {
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

const TYPE_AUTH: Object = {
  authenticated: PropTypes.bool,
};

/**
 * [path description]
 * @type {String}
 */
export default class Routes extends React.PureComponent {
  static propTypes: Object = {
    auth: PropTypes.shape(TYPE_AUTH).isRequired,
  };

  /**
   * [isAuthenticated description]
   * @type {Object}
   */
  render(): React$Element {
    const { auth: { authenticated } } = this.props;

    return (
      <Switch>
        <ConditionalRoute
          exact
          condition={!authenticated}
          path="/"
          satisfied={HomePage}
          unsatisfied="/app/dashboard"
        />
        <Route exact path="/app" component={PageContainer} >
          <Route exact path="/">
            <Redirect to="/app/dashboard" />
          </Route>
          <ConditionalRoute
            exact
            condition={authenticated}
            path="/dashboard"
            satisfied={DashboardPage}
            unsatisfied="/"
          />
          <Route exact path="/error/404" component={NotFoundPage} />
          <Route exact path="/error/500" component={InternalServerErrorPage} />
        </Route>
      </Switch>
    );
  }
}
