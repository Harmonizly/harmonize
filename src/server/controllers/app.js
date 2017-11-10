import App from 'client/app';
import Logger from 'server/utils/logger';
import React from 'react';
import template from 'static/index.html';
import { StaticRouter as Router } from 'react-router-dom';
import { renderToString } from 'react-dom/server';

const LOGGER: Object = Logger.get('root');

/**
 * [redirectHandler description]
 * @param  {[type]} request  [description]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
export function redirectHandler(request: Object, response: Object): void {
  return response.redirect('/app');
}

/**
 * [render description]
 * @param  {[type]} request  [description]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
export function renderHandler(request: Object, response: Object): void {
  // TODO build store server-side to hydrate app
  const defaultStore: ?Object = null;
  const context: Object = {};
  const markup: String = renderToString(
    <Router basename="/app" location={request.url} context={context}>
      <App store={defaultStore} />
    </Router>
  );

  if (context.url) {
    LOGGER.info(`redirecting to: ${context.url}`);
    return response.redirect(301, context.url);
  }

  return response.render('index', { locals: { app: markup } });
}
