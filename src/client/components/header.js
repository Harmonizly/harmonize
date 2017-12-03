import PropTypes from 'prop-types';
import React from 'react';
import { autobind } from 'core-decorators';
import { Button } from 'semantic-ui-react';

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
      <div>
        <Button onClick={this.login}>Login</Button>
      </div>
    );
  }
}
