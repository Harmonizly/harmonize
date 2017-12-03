import config from 'configuration/webpack/client/webpack.config';
import webpack from 'webpack';
import wdm from 'webpack-dev-middleware';
import whm from 'webpack-hot-middleware';

const compiler: Object = webpack(config);

/**
 * [noInfo description]
 * @type {Boolean}
 */
export const webpackDevMiddleware: Function = wdm(compiler, {
  noInfo: false,
  quiet: false,
  lazy: false,
  watchOptions: {
    aggregateTimeout: 300,
    poll: true,
  },
  publicPath: process.env.ASSET_PATH,
  index: 'static/index.html',
  headers: { 'X-Custom-Header': 'yes' },
  mimeTypes: { 'text/html': ['phtml'] },
  stats: {
    colors: true,
  },
  reporter: null,
  serverSideRender: true,
});

/**
 *
 */
export const webpackHotMiddleware: Function = whm(compiler);
