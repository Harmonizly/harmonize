import React from 'react';

import SideNavigationLayout from 'client/layouts/sideNavigation';
import HeaderComponent from 'client/components/common/header';

/**
 *
 */
export default class DashboardPage extends React.Component {
  /**
   *
   */
  render(): React$Element {
    return (
      <SideNavigationLayout header={<HeaderComponent />} >
        Dashboard!
      </SideNavigationLayout>
    );
  }
}
