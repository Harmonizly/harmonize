import 'rxjs';

import DevTools from 'client/containers/devtools';
import PropTypes from 'prop-types';
import React from 'react';
import Routes from 'client/lib/routes';

import { injectGlobal } from 'emotion';
import { Sidebar, Segment } from 'semantic-ui-react'

injectGlobal`

  #harmonize {
    height: 100%;
  }

  .collapsed {
    padding: 0 !important;
  }

  .fill {
    height: 100%;
    width: 100%;
  }
`;

/**
 * [store description]
 * @type {Object}
 */
export default class App extends React.Component {
  static propTypes: Object = {
    config: PropTypes.object.isRequired,
  };

  config: Object = {};

  /**
   * [props description]
   * @type {[type]}
   */
  constructor(props: Object, context: Object): void {
    super(props, context);
    this.config = { ...props.config };
  }

  /**
   * [env description]
   * @type {[type]}
   */
  renderDevtools(): ?React$Element {
    return (this.config.env === 'development') ? (<DevTools />) : null;
  }

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
}
