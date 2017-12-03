import ConditionalRoute from 'client/components/routes/conditionalRoute';
import DashboardPage from 'client/pages/dashboard';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

/**
 *
 */
class DashboardRoute extends React.Component {
  static propTypes: Object = {
    auth: PropTypes.shape({
      authenticated: PropTypes.bool,
    }),
  };

  static defaultProps: Object = {
    auth: {},
  };

  /**
   * [condition description]
   * @type {Object}
   */
  render(): React$Element {
    return (
      <ConditionalRoute
        exact
        condition={!!(this.props.auth.authenticated)}
        path="/dashboard"
        satisfied={DashboardPage}
        unsatisfied="/"
      />
    );
  }
}

export default connect((store: Object) => {
  return {
    auth: store.auth,
  };
})(DashboardRoute);
