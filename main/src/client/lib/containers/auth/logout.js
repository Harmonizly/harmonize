import React from 'react';
import { connect } from 'react-redux';

/**
 *
 */
class LogoutContainer extends React.Component {

  /**
   *
   */
  render(): React$Element {
    return (<div>Logging out...</div>);
  }
}

export default connect((state) => {
  return { user: state.user };
})(LogoutContainer);
