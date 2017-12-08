import PropTypes from 'prop-types';
import React from 'react';

import { autobind } from 'core-decorators';
import { Button, Segment } from 'semantic-ui-react';

/**
 *
 */
export default class HeaderComponent extends React.Component {
  /**
   * [onClick description]
   * @type {Object}
   */
  @autobind
  login(): void {

  }

  /**
   *
   */
  render(): React$Element {
    return (
      <Segment
        padded
        basic
        inverted
        color="blue"
        className="header"
        as="section"
      >
        <Button size="small" primary onClick={this.login}>Login</Button>
      </Segment>
    );
  }
}
