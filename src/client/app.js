import 'rxjs';

import PropTypes from 'prop-types';
import React from 'react';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Sidebar, Segment } from 'semantic-ui-react';

// import DevTools from 'client/containers/devtools';
import Routes from 'client/routes';

// const TYPE_CONFG: Object = {
//   env: PropTypes.string.isRequired,
// };

// const TYPE_SESSION: Object = {
//   account: PropTypes.object,
//   token: PropTypes.string,
//   user: PropTypes.object,
// };

// const TYPE_STATE: Object = {
//   session: PropTypes.shape(TYPE_SESSION).isRequired,
// };

/**
 * [store description]
 * @type {Object}
 */
export default class App extends React.PureComponent {
  static propTypes: Object = {
    cache: PropTypes.object.isRequired,
    // config: PropTypes.shape(TYPE_CONFG).isRequired,
  };

  /**
   * [cache description]
   * @type {[type]}
   */
  componentWillMount(): void {
    this.cache = this.props.cache;
  }

  cache: InMemoryCache;

  /**
   * [env description]
   * @type {[type]}
   */
  // renderDevtools(): ?React$Element {
  //   return (this.props.config.env === 'development') ? (<DevTools />) : null;
  // }

  /**
   * [store description]
   * @type {Object}
   */
  render(): React$Element {
    return (
      <Sidebar.Pushable as={Segment}>
        <Sidebar.Pusher className="fill">
          <Routes />
          {/* { this.renderDevtools() } */}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}
