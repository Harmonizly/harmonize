import ContentContainer from 'client/containers/content';
import NavigationComponent from 'client/components/navigation';
import PropTypes from 'prop-types';
import React from 'react';


/**
 *
 */
export default class DefaultLayout extends React.Component {
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
      <ContentContainer>
        <NavigationComponent />
        <div>
          {this.props.children}
        </div>
      </ContentContainer>
    );
  }
}
