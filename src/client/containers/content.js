import PropTypes from 'prop-types';
import React from 'react';

/**
 *
 */
export default class ContentContainer extends React.Component {
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
    return <div className="content"> { this.props.children } </div>;
  }
}
