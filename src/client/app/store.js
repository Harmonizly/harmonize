import rootEpic from 'client/lib/epics';
import rootReducer from 'client/lib/reducers';
import DevTools from 'client/lib/containers/devtools';
import { compose, createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

/**
 * [state description]
 * @type {[type]}
 */
export default (state: Object, env: string): Object => {
  const epicMiddleware: Function = createEpicMiddleware(rootEpic);
  const { ...initialState }: Object = state;

  const enhancer: Object = (env === 'development') ?
    compose(applyMiddleware(epicMiddleware), DevTools.instrument()) :
    compose(applyMiddleware(epicMiddleware));

  const store: Object = createStore(
    rootReducer,
    initialState,
    enhancer
  );

  if (module && module.hot) {
    module.hot.accept('client/lib/reducers', () => { return store.replaceReducer(rootReducer); });
  }

  return store;
};
