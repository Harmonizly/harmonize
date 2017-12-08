import React from 'react';

import DefaultLayout from 'client/layouts/default';

/**
 *
 */
export default class InternalServerErrorPage extends React.Component {
  /**
   *
   */
  render(): React$Element {
    return (
      <DefaultLayout>
        Whoops!
      </DefaultLayout>
    );
  }
}
