import React from 'react';

import DefaultLayout from 'client/layouts/default';
import HeaderComponent from 'client/components/home/header';


/**
 *
 */
export default class HomePage extends React.Component {
  /**
   *
   */
  render(): React$Element {
    return (
      <DefaultLayout header={<HeaderComponent />} >
        Home!
      </DefaultLayout>
    );
  }
}
