import ejs from 'ejs';
import React from 'react';
import { Logger } from 'axon';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';

import App from 'client/app';
import template from 'static/index.ejs';
import { queryAccount } from 'server/services/account';
import { cache } from 'server/services/lib/client';

const LOGGER: Object = Logger.getLogger('root');

/**
 * [getPreloadedState description]
 * @param  {[type]} ctx [description]
 * @return {[type]}     [description]
 */
async function getPreloadedState(ctx: Object): Object {
  const accountState: Object = await queryAccount(ctx.request.user.id);
  // TODO make sure we properly return a 503 if unavailable & error.status

  return {
    account: accountState,
    user: ctx.request.user,
  };
}

/**
 * [render description]
 * @param  {[type]} ctx  [description]
 * @return {[type]}      [description]
 */
export default async function render(ctx: Object): void {
  const c: Object = { env: process.env.NODE_ENV };
  const context: Object = {};

  let state: Object = {};

  try {
    // TODO move into a method?
    state = await getPreloadedState();
  } catch (e) {
    LOGGER.error(e);
    context.url = `/error/${e.status}`;
  }

  const markup: String = renderToString((
    <Router location={ctx.url} context={context}>
      <App cache={cache.extract()} config={c} state={state} />
    </Router>
  ));

  if (context.url) {
    LOGGER.info(`redirecting to: ${context.url}`);
    ctx.redirect(301, context.url);
  } else {
    ctx.body = ejs.render(template, { app: markup });
  }
}
