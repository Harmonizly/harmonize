import PropTypes from 'prop-types';
import React from 'react';

import ErrorBoundary from 'client/containers/error';

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
      <div className="fill page">
        <ErrorBoundary>
          {this.props.children}
        </ErrorBoundary>
      </div>
    );
  }
}
