import config from 'config';
import ejs from 'ejs';
import React from 'react';
import template from 'static/index.ejs';

import App from 'client/app';
import createStore from 'client/store';
import Logger from 'server/utils/logger';

import { StaticRouter as Router } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';

const LOGGER: Object = Logger.get('root');

/**
 * [generateClientConfig description]
 * @return {[type]} [description]
 */
function generateClientConfig(): Object {
  const env: string = process.env.NODE_ENV;
  const cc: Object = {
    ...config.get('client').config,
    env,
  };

  return {
    config: cc,
    env,
    store: config.get('client').store,
  };
}

/**
 * [render description]
 * @param  {[type]} request  [description]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
export function renderHandler(request: Object, response: Object): void {
  const cc: Object = generateClientConfig();
  const context: Object = {};
  const store: Object = createStore(cc.store, cc.env);

  const markup: String = renderToString((
    <Provider store={store}>
      <Router location={request.url} context={context}>
        <App config={cc.config} />
      </Router>
    </Provider>
  ));

  if (context.url) {
    LOGGER.info(`redirecting to: ${context.url}`);
    return response.redirect(301, context.url);
  }

  // TODO set data for client in JWT
  const html: string = ejs.render(template, {
    app: markup,
    config: cc.config,
    store: store.getState(),
  });

  return response.send(html);
}
