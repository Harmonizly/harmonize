import React from 'react';

// Components
import DashboardRoute from 'client/components/routes/dashboardRoute';
import HomePage from 'client/pages/home';
import InternalServerErrorPage from 'client/pages/error/500';
import NotFoundPage from 'client/pages/error/404';
import PageContainer from 'client/containers/page';

import {
  Route,
  Switch,
} from 'react-router-dom';

/**
 * [path description]
 * @type {String}
 */
export default class Routes extends React.Component {
  /**
   * [isAuthenticated description]
   * @type {Object}
   */
  render(): React$Element {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/app" component={PageContainer} >
          <DashboardRoute />
          <Route exact path="/error/404" component={NotFoundPage} />
          <Route exact path="/error/500" component={InternalServerErrorPage} />
        </Route>
      </Switch>
    );
  }
}
