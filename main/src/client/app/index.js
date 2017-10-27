import 'rxjs';

import ContentContainer from 'client/lib/containers/content';
import DevTools from 'client/lib/containers/devtools';
import FooterComponent from 'client/lib/components/footer';
import HeaderComponent from 'client/lib/components/header';
import NavigationComponent from 'client/lib/components/navigation';
import React from 'react';
import Routes from 'client/app/routes';
import createStore from 'client/app/store';

import { connect } from 'react-redux';
import { generateApis } from 'client/lib/apis';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { DEFAULT_ENV } from 'client/lib/constants';

/**
 * [store description]
 * @type {Object}
 */
export default class App extends React.Component {

  // TODO provide way to hydrate store on server and on webapp
  apis: Object;
  env: string;
  store: Object;

  constructor(props: Object, context: Object): void {
    super(props, context);
    this.env = this.getCurrentEnvironment();
    this.store = createStore(this.props.state, this.env);
    this.apis = generateApis(this.props.store);
  }

  /**
   * [store description]
   * @type {Object}
   */
  getCurrentEnvironment(): string {
    return process.env.NODE_ENV || window.NODE_ENV || DEFAULT_ENV;
  }

  /**
   * [store description]
   * @type {Object}
   */
  render(): React$Element {
    debugger
    return (
      <Provider store={this.store}>
        <Router>
          <div className="page">
            <HeaderComponent />
            <NavigationComponent />
            <ContentContainer>
              <Routes />
            </ContentContainer>
            <FooterComponent />
            { this.renderDevtools() }
          </div>
        </Router>
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
