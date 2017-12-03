import 'rxjs';

import createStore from 'client/lib/store';
import DevTools from 'client/containers/devtools';
import PropTypes from 'prop-types';
import React from 'react';
import Routes from 'client/lib/routes';

import { DEFAULT_ENV } from 'client/lib/constants';
import { Provider } from 'react-redux';

/**
 * [store description]
 * @type {Object}
 */
export default class App extends React.Component {
  static childContextTypes: Object = {
    apis: PropTypes.object,
  };

  static propTypes: Object = {
    config: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
  };

  env: string;
  store: Object;

  /**
   * [props description]
   * @type {[type]}
   */
  constructor(props: Object, context: Object): void {
    super(props, context);
    this.env = this.getCurrentEnvironment();
    this.store = createStore(this.props.store, this.env);
  }

  /**
   * [store description]
   * @type {Object}
   */
  getCurrentEnvironment(): string {
    return process.env.NODE_ENV || DEFAULT_ENV;
  }

  /**
   * [env description]
   * @type {[type]}
   */
  renderDevtools(): ?React$Element {
    return (this.env === 'development') ?
      (<DevTools />) :
      null;
  }

  /**
   * [store description]
   * @type {Object}
   */
  render(): React$Element {
    return (
      <Provider store={this.store}>
        <div className="wrapper" >
          <Routes />
          { this.renderDevtools() }
        </div>
      </Provider>
    );
  }
}
