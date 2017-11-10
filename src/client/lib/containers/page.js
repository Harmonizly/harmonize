import PropTypes from 'prop-types';
import React from 'react';

/**
 *
 */
export default class PageContainer extends React.Component {
  static propTypes: Object = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired
  };

  /**
   *
   */
  render(): React$Element {
    return <div className="page"> { this.props.children } </div>;
  }
}
