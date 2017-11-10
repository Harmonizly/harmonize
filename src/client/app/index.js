import 'rxjs';

import apis from 'client/lib/apis';
import createStore from 'client/app/store';
import DevTools from 'client/lib/containers/devtools';
import FooterComponent from 'client/lib/components/footer';
import HeaderComponent from 'client/lib/components/header';
import NavigationComponent from 'client/lib/components/navigation';
import PropTypes from 'prop-types';
import React from 'react';
import Routes from 'client/app/routes';

import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { DEFAULT_ENV, DEFAULT_INITIAL_STATE } from 'client/app/constants';

/**
 * [store description]
 * @type {Object}
 */
export default class App extends React.Component {

  static propTypes: Object = {
    store: PropTypes.shape(DEFAULT_INITIAL_STATE)
  };

  static defaultProps: Object = {
    store: DEFAULT_INITIAL_STATE
  };

  // TODO provide way to hydrate store on server and on webapp
  apis: Object;
  env: string;
  store: Object;

  constructor(props: Object, context: Object): void {
    super(props, context);
    this.env = this.getCurrentEnvironment();
    this.store = createStore(this.props.store, this.env);
    this.apis = apis();
  }

  /**
   * [store description]
   * @type {Object}
   */
  getCurrentEnvironment(): string {
    return process.env.NODE_ENV || DEFAULT_ENV;
  }

  /**
   * [store description]
   * @type {Object}
   */
  render(): React$Element {
    return (
      <Provider store={this.store}>
        <div>
          <Routes />
          { this.renderDevtools() }
        </div>
      </Provider>
    );
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
}
