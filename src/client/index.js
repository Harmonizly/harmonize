import App from 'client/app';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

render(
  <Router basename="/app">
    <App />
  </Router>,
  document.getElementById('harmonize')
);
