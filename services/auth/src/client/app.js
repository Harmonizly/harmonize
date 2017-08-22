import React from 'react';
import routes from 'client/routes';

/**
 * 
 */
export default class App extends React.Component {
  render(): React$Element {
    return (
      <div>{routes}</div>
    );
  }
}
