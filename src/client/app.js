import 'rxjs';

import PropTypes from 'prop-types';
import React from 'react';

import DevTools from 'client/containers/devtools';
import Routes from 'client/routes';

import { Sidebar, Segment } from 'semantic-ui-react';

// Define the apis we're expecting
const APIS_SHAPE: Object = {
  auth: PropTypes.object,
};

/**
 * [store description]
 * @type {Object}
 */
export default class App extends React.Component {
  static childContextTypes: Object = {
    apis: PropTypes.shape(APIS_SHAPE).isRequired,
  };

  static propTypes: Object = {
    apis: PropTypes.shape(APIS_SHAPE).isRequired,
  };

  /**
   * [apis description]
   * @type {[type]}
   */
  getChildContext(): Object {
    return {
      apis: this.props.apis,
    };
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

  /**
  * [env description]
  * @type {[type]}
  */
  renderDevtools(): ?React$Element {
    return (this.config.env === 'development') ? (<DevTools />) : null;
  }
}
