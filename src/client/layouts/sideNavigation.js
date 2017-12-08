import PropTypes from 'prop-types';
import React from 'react';

import ContentContainer from 'client/containers/content';
import NavigationComponent from 'client/components/navigation';
import PageContainer from 'client/containers/page';
import WrapperContainer from 'client/containers/wrapper';


/**
 *
 */
export default class SideNavigationLayout extends React.Component {
  static propTypes: Object = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
    header: PropTypes.node,
  };

  static defaultProps: Object = {
    header: null
  }

  /**
   *
   */
  render(): React$Element {
    const { children, header } = this.props;

    return (
      <PageContainer>
        {header}
        <WrapperContainer>
          <NavigationComponent />
          <ContentContainer>
            {children}
          </ContentContainer>
        </WrapperContainer>
      </PageContainer>
    );
  }
}
