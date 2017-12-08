import React from 'react';
import ReactDOM from 'react-dom';

import App from 'client/app';
import createStore from 'client/store';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

// TODO get data from server via JWT
const config: Object = window.__CONFIG__;
const store: Object = createStore(window.__INITIAL_STATE__, config.env);

delete window.__INITIAL_STATE__;
delete window.__CONFIG__;

const render: Function = (Root: React$Element): void => {
  ReactDOM.hydrate(
    (
      <Provider store={store}>
        <Router>
          <Root config={config} />
        </Router>
      </Provider>
    ),
    document.getElementById('harmonize')
  );
}

if (module && module.hot) {
  module.hot.accept('./app.js', () => {
    render(App);
  })
}

render(App);
