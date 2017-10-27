import React from 'react';
import { connect } from 'react-redux';

/**
 * [user description]
 * @type {[type]}
 */
class LoginContainer extends React.Component {

  render(): React$Element {
    return (<div>Login!</div>);
  }
}

export default connect((state) => {
  return { user: state.user };
})(LoginContainer);
