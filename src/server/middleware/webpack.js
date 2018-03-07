import config from 'build/webpack.client.config';
// eslint-disable-next-line import/no-extraneous-dependencies
import webpack from 'webpack';
// eslint-disable-next-line import/no-extraneous-dependencies
import wdm from 'koa-webpack-dev-middleware';
// eslint-disable-next-line import/no-extraneous-dependencies
import whm from 'koa-webpack-hot-middleware';

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
