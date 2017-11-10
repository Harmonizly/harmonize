import DefaultLayout from 'client/lib/layouts/default';
import React from 'react';

/**
 *
 */
export default class DashboardPage extends React.Component {
  /**
   *
   */
  render(): React$Element {
    return (
      <DefaultLayout>
        <div>Dashboard!</div>
      </DefaultLayout>
    );
  }
}
