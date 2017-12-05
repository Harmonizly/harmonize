import App from 'client/app';
import appConfig from 'configuration/client/config.json';
import ejs from 'ejs';
import Logger from 'server/utils/logger';
import React from 'react';
import template from 'static/index.ejs';

import { StaticRouter as Router } from 'react-router-dom';
import { renderToString } from 'react-dom/server';

const LOGGER: Object = Logger.get('root');

/**
 * [render description]
 * @param  {[type]} request  [description]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
export function renderHandler(request: Object, response: Object): void {
  const context: Object = {};
  const markup: String = renderToString(
    <Router location={request.url} context={context}>
      <App config={appConfig.config} store={appConfig.store} />
    </Router>
  );

  if (context.url) {
    LOGGER.info(`redirecting to: ${context.url}`);
    return response.redirect(301, context.url);
  }

  const html = ejs.render(template, { app: markup });

  return response.send(html);
}
