import PropTypes from 'prop-types';
import React from 'react';

/**
 *
 */
export default class ContentContainer extends React.Component {
  static propTypes: Object = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired
  };

  /**
   *
   */
  render(): React$Element {
    return <div className="content"> { this.props.children } </div>;
  }
}
