import PropTypes from 'prop-types';
import React from 'react';
import {
  Redirect,
  Route
} from 'react-router-dom';

/**
 * [description]
 * @param  {[type]} component [description]
 * @param  {[type]} rest      [description]
 * @return {[type]}           [description]
 */
export default class ConditionalRoute extends React.Component {
  static propTypes: Object = {
    condition: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]).isRequired,
    satisfied: PropTypes.func.isRequired,
    unsatisfied: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired
  };

  /**
   * [RedirectTo description]
   * @type {[type]}
   */
  renderRedirectTo(Unsatisfied: React$Element | string, renderProps: Object): React$Element {
    const { unsatisfied } = this.props.unsatisfied;

    return (typeof (unsatisfied) === 'string' ?
      <Redirect to={{ pathname: unsatisfied, state: { from: renderProps.location } }} /> :
      React.createElement(unsatisfied, renderProps)
    );
  }

  /**
   * [Component description]
   * @type {[type]}
   */
  renderConditionalComponent(
    condition: boolean,
    renderProps: Object
  ): React$Element {
    return condition ?
      React.createElement(this.props.satisfied, renderProps) :
      (this.renderRedirectTo(renderProps));
  }

  /**
   * [component description]
   * @type {[type]}
   */
  render(): React$Element {
    const {
      satisfied,
      unsatisfied,
      condition,
      ...rest
    } = this.props;

    const conditional: boolean = typeof (condition) === 'function' ? condition() : condition;

    return (
      <Route
        {...rest}
        render={
          (renderRrops): React$Element => {
            return this.renderConditionalComponent(conditional, renderRrops);
          }
        }
      />
    );
  }
}
