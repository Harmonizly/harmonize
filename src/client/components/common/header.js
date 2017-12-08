import PropTypes from 'prop-types';
import React from 'react';

import { Segment } from 'semantic-ui-react'

/**
 *
 */
export default class HeaderComponent extends React.Component {
  /**
   *
   */
  render(): React$Element {
    return (
      <Segment padded basic className="header" as="section" />
    );
  }
}
