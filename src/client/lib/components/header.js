import apis from 'client/lib/apis';
import React from 'react';
import { autobind } from 'core-decorators';
import { Button } from 'semantic-ui-react';

/**
 *
 */
export default class HeaderComponent extends React.Component {
  auth0: Object;

  /**
   * [props description]
   * @type {[type]}
   */
  constructor(props: Object, context: Object): void {
    super(props, context);
    this.auth0 = apis('auth0');
  }

  /**
   * [onClick description]
   * @type {Object}
   */
  @autobind
  login(): void {
    debugger;
    this.auth0.login();
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
