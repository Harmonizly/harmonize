import PropTypes from 'prop-types';
import React from 'react';

import { Segment } from 'semantic-ui-react';

/**
 *
 */
export default class WrapperContainer extends React.Component {
  static propTypes: Object = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  };

  /**
   *
   */
  render(): React$Element {
    return (
      <Segment basic className="collapsed fill wrapper" >
        {this.props.children}
      </Segment>
    );
  }
}
