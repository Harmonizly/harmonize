import App from 'client/app';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

/**
 * Renders the App (client) into the #app id within a BrowserRouter
 * https://reacttraining.com/react-router/web/api/BrowserRouter
 */
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
);
