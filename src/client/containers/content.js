import PropTypes from 'prop-types';
import React from 'react';

import { Container } from 'semantic-ui-react';

/**
 *
 */
export default class ContentContainer extends React.PureComponent {
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
      <Container className="fill content">
        {this.props.children}
      </Container>
    );
  }
}
