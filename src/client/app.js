import 'rxjs';

import React from 'react';

import DevTools from 'client/containers/devtools';
import Routes from 'client/routes';

import { Sidebar, Segment } from 'semantic-ui-react';

/**
 * [store description]
 * @type {Object}
 */
export default class App extends React.Component {
  /**
   * [store description]
   * @type {Object}
   */
  render(): React$Element {
    return (
      <Sidebar.Pushable as={Segment}>
        <Sidebar.Pusher className="fill">
          <Routes />
          { this.renderDevtools() }
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }

  /**
  * [env description]
  * @type {[type]}
  */
  renderDevtools(): ?React$Element {
    return (this.config.env === 'development') ? (<DevTools />) : null;
  }
}
