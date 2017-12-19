import React from 'react';

/**
 * [resolveApis description]
 * @param  {[type]}  apis [description]
 * @return {Boolean}      [description]
 */
function resolveApis(names: string, apis: Object): Object {
  return names.split(' ').reduce((accum: Object, api: string): Object => {
    const newAccum = { ...accum, [api]: apis[api] };

    return newAccum;
  }, {});
}

/**
 * [withApi description]
 * @param  {[type]} WrappedComponent [description]
 * @param  {[type]} apis             [description]
 * @return {[type]}                  [description]
 */
export default function withApi(WrappedComponent: Function, names: string): Function {
  /**
   * [apiMap description]
   * @type {[type]}
   */
  return class extends React.Component {
    /**
     * [apiMap description]
     * @type {[type]}
     */
    render(): React$Element {
      const mapping: Object = resolveApis(names, this.context.apis);

      return (
        <WrappedComponent {...mapping} {...this.props} />
      );
    }
  };
}
