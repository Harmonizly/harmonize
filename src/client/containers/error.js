import PropTypes from 'prop-types';
import React from 'react';

/**
 *
 */
export default class ErrorBoundary extends React.Component {
  static propTypes: Object = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  };

  state: Object = {
    error: null,
    info: null,
  };

  /**
   * [componentDidCatch description]
   * @param  {[type]} error [description]
   * @param  {[type]} info  [description]
   * @return {[type]}       [description]
   */
  componentDidCatch(error, info): void {
    return this.setState({
      error,
      info,
    });
  }

  /**
   * [render description]
   * @param  {[type]} React$Element [description]
   * @return {[type]}               [description]
   */
  render(): React$Element {
    if (this.state.error == null) {
      return this.props.children;
    }

    return (
      <div>
        <section>
          <h4>Clean me up Scotty!</h4>
          <p>{JSON.stringify(this.state.error)}</p>
          <p>{JSON.stringify(this.state.info)}</p>
        </section>
        <section>
          {this.props.children}
        </section>
      </div>
    );
  }
}
