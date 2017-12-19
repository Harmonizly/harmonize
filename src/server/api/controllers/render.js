import config from 'config';
import ejs from 'ejs';
import React from 'react';

import App from 'client/app';
import createStore from 'client/store';
import template from 'static/index.ejs';

import { StaticRouter as Router } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';

import { createApis } from 'client/lib/apis';
import { getLogger } from 'jarvis';

const LOGGER: Object = getLogger('root');

/**
 * [render description]
 * @param  {[type]} request  [description]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
export async function render(request: Object, response: Object): void {
  const context: Object = {};
  // TODO get auth status. If auth'd fill in user and account info
  const store: Object = createStore();

  // Create the Swagger client APIs and provide them to the app
  const apis: Object = await createApis(config.apis);

  const markup: String = renderToString((
    <Provider store={store}>
      <Router location={request.url} context={context}>
        <App apis={apis} />
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
  });

  return response.send(html);
}
