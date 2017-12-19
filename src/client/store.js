import rootEpic from 'client/lib/epics';
import rootReducer from 'client/lib/reducers';
import DevTools from 'client/containers/devtools';

import { compose, createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

function getEnhancers(env): Function {
  const epicMiddleware: Function = createEpicMiddleware(rootEpic);

  return (env === 'development') ?
    compose(applyMiddleware(epicMiddleware), DevTools.instrument()) :
    compose(applyMiddleware(epicMiddleware));
}

/**
 * [state description]
 * @type {[type]}
 */
export default (): Object => {
  const env: string = process.env.NODE_ENV;
  const enhancer: Function = getEnhancers(env);

  const store: Object = createStore(
    rootReducer,
    enhancer,
  );

  if (module && module.hot) {
    module.hot.accept(
      './lib/reducers/index.js',
      () => { return store.replaceReducer(rootReducer); },
    );
  }

  return store;
};
