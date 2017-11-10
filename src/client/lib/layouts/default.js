import ContentContainer from 'client/lib/containers/content';
import HeaderComponent from 'client/lib/components/header';
import NavigationComponent from 'client/lib/components/navigation';
import PageContainer from 'client/lib/containers/page';
import PropTypes from 'prop-types';
import React from 'react';


/**
 *
 */
export default class DefaultLayout extends React.Component {
  static propTypes: Object = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]).isRequired
  };

  /**
   *
   */
  render(): React$Element {
    return (
      <PageContainer>
        <HeaderComponent />
        <ContentContainer>
          <NavigationComponent />
          <div>{this.props.children}</div>
        </ContentContainer>
      </PageContainer>
    );
  }
}
