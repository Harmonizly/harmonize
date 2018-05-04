import config from 'build/webpack.client.config';
// eslint-disable-next-line import/no-extraneous-dependencies
import webpack from 'webpack';
// eslint-disable-next-line import/no-extraneous-dependencies
import webpackMiddleware from 'koa-webpack';

const compiler: Object = webpack(config);

/**
 * [noInfo description]
 * @type {Boolean}
 */
export const webpackDevMiddleware: Function = webpackMiddleware({
  compiler,
  hot: {
    hot: true,
    port: 3001,
  },
  lazy: false,
  publicPath: config.output.publicPath,
  index: `${process.env.ASSET_PATH}/index.html`,
  stats: config.stats || { colors: true },
  serverSideRender: false,
});
