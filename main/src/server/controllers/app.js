import App from 'client/app';
import React from 'react';
import renderingEngine from 'express-es6-template-engine';
import template from 'static/index.html';
import { StaticRouter as Router } from 'react-router-dom';
import { renderToString } from 'react-dom/server';

/**
 * [redirectHandler description]
 * @param  {[type]} request  [description]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
export function redirectHandler(request: Object, response: Object): void {
  return response.redirect('/app/');
}

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
        <App />
    </Router>
  );

  if (context.url) {
    return response.redirect(301, context.url);
  }

  const html: string = renderingEngine(template, { locals: { app: markup }});
  return response.send(html);
}
