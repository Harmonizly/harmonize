import React from 'react';
import ReactDOM from 'react-dom';

import App from 'client/app';
// import createStore from 'client/store';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

const store: Object = createStore();

const render: Function = (Root: React$Element): void => {
  ReactDOM.hydrate(
    (
      <Provider>
        <Router>
          <Root />
        </Router>
      </Provider>
    ),
    document.getElementById('harmonize'),
  );
};

if (module && module.hot) {
  module.hot.accept('./app.js', () => {
    render(App);
  });
}

render(App);
