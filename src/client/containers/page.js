import HeaderComponent from 'client/components/header';
import PropTypes from 'prop-types';
import React from 'react';

/**
 *
 */
export default class PageContainer extends React.Component {
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
      <div>
        <HeaderComponent />
        { this.props.children }
      </div>
    );
  }
}
