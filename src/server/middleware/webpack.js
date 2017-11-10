import config from 'configuration/webpack/webpack.server';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';

/**
 * [noInfo description]
 * @type {Boolean}
 */
export default webpackMiddleware(webpack(config), {
  noInfo: false,
  quiet: false,
  lazy: false,
  watchOptions: {
    aggregateTimeout: 300,
    poll: true
  },
  publicPath: process.env.ASSET_PATH,
  index: 'static/index.html',
  headers: { 'X-Custom-Header': 'yes' },
  mimeTypes: { 'text/html': ['phtml'] },
  stats: {
    colors: true
  },
  reporter: null,
  serverSideRender: false
});
