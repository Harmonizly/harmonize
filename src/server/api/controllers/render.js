import ejs from 'ejs';
import React from 'react';

import { Logger } from 'axon';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';

import App from 'client/app';
import AccountService from 'server/api/services/accounts';
import AuthService from 'server/api/services/auth';
import createStore from 'client/store';
import template from 'static/index.ejs';
import UserService from 'server/api/services/users';

const LOGGER: Object = Logger.getLogger('root');

/**
 * [getAccountState description]
 * @param  {[type]} api [description]
 * @return {[type]}     [description]
 */
async function getAccountState(userId: Number): Object {
  return AccountService.account(userId);
}

/**
 * [getAuthState description]
 * @param  {[type]} api [description]
 * @return {[type]}     [description]
 */
async function getAuthState(): Object {
  // TODO reach out to auth0
  return AuthService.session();
}

/**
 * [getUserState description]
 * @param  {[type]} api [description]
 * @return {[type]}     [description]
 */
async function getUserState(userId: Number): Object {
  return UserService.user(userId);
}

/**
 * [getPreloadedState description]
 * @return {[type]} [description]
 */
async function getPreloadedState(): Object {
  // TODO move this check into middleware and put user info in ctx
  const auth = await getAuthState();
  // TODO check auth status and redirect?

  const [account, user] = await Promise.all(
    getAccountState(auth.id),
    getUserState(auth.id),
  );

  return {
    account,
    auth,
    user,
  };
}

/**
 * [render description]
 * @param  {[type]} ctx  [description]
 * @return {[type]}      [description]
 */
export default async function render(ctx: Object): void {
  const context: Object = {};
  let markup: String = '';

  // TODO move into a method?
  try {
    const store: Object = createStore(getPreloadedState());

    markup = renderToString((
      <Provider store={store}>
        <Router location={ctx.url} context={context}>
          <App />
        </Router>
      </Provider>
    ));
  } catch (e) {
    LOGGER.error(e);
    context.url = '/error/500';
  }

  if (context.url) {
    LOGGER.info(`redirecting to: ${context.url}`);
    return ctx.redirect(301, context.url);
  }

  const html: string = ejs.render(template, {
    app: markup,
  });

  ctx.body = html;

  return null;
}
