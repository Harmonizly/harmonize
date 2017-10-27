import rootEpic from 'client/lib/epics';
import rootReducer from 'client/lib/reducers';
import DevTools from 'client/lib/containers/devtools';
import { compose, createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { DEFAULT_INITIAL_STATE } from 'client/lib/constants';

/**
 * [generateInitialState description]
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
function generateInitialState(state: ?Object): Object {
  if (state == null) {
    return DEFAULT_INITIAL_STATE;
  }

  return {
    ...DEFAULT_INITIAL_STATE,
    ...state
  };
}

/**
 * [state description]
 * @type {[type]}
 */
export default (state: ?Object, env: string): Object => {
  const epicMiddleware: Function = createEpicMiddleware(rootEpic);
  const initialState: Object = generateInitialState(state);

  const enhancer: Object = (env === 'development') ?
    compose(applyMiddleware(epicMiddleware), DevTools.instrument()) :
    compose(applyMiddleware(epicMiddleware));

  const store: Object = createStore(
    rootReducer,
    initialState,
    enhancer
  );

  if (module && module.hot) {
    module.hot.accept('client/lib/reducers', () =>
      store.replaceReducer(require('client/lib/reducers')/*.default if you use Babel 6+ */)
    );
  }

  return store;
}
