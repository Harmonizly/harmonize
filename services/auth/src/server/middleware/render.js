import App from 'client/app';
import es6Renderer from 'express-es6-template-engine';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import index from 'static/index.html';
import { StaticRouter } from 'react-router';

/**
 * [render description]
 * @param  {[type]}   request  [description]
 * @param  {[type]}   response [description]
 * @param  {Function} next     [description]
 * @return {[type]}            [description]
 */
export default function render(request: Object, response: Object, next: Function): void {
  // eslint-disable-next-line no-param-reassign
  response.render = (url: string, data: Object): void => {
    const context: Object = Object.assign({}, data);
    const markup: string = ReactDOMServer.renderToString(
      <StaticRouter location={url} context={context} >
        <App />
      </StaticRouter>
    );

    if (context.url) {
      return response.redirect(301, context.url);
    }

    const html: string = es6Renderer(index, { locals: { app: markup } });

    return response.send(html);
  };

  next();
}
