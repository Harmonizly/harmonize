import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from 'client/app';

const render: Function = (Root: React$Element): void => {
  ReactDOM.hydrate(
    (
      <Router>
        <Root />
      </Router>
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
