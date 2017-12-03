import App from 'client/app';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

const render = (Root) => {
  ReactDOM.render(
    <Router>
      <Root />
    </Router>,
    document.getElementById('harmonize')
  );
}

render(App);

if (module && module.hot) {
  module.hot.accept('./app.js', () => {
    render(<App />);
  })
}
