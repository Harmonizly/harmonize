import config from 'configuration/webpack/webpack.client.config';
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
  publicPath: config.output.publicPath,
  index: `${process.env.ASSET_PATH}/index.html`,
  stats: config.stats || { colors: true },
  reporter: null,
  serverSideRender: false,
});

/**
 *
 */
export const webpackHotMiddleware: Function = whm(compiler);
