const config = require('config');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const webpack = require('webpack');

const cwd = process.cwd();

// For dynamic public paths: https://webpack.js.org/guides/public-path/
const ASSET_PATH = path.join(cwd, config.assets.path);
const ASSET_URL = config.assets.url;
const NODE_ENV = process.env.NODE_ENV || 'development';
const STATIC_URL = config.static.url;

module.exports = {
  target: 'web',
  mode: process.env === 'PRODUCTION' ? 'production' : 'development',
  cache: false,
  devtool: 'source-map',
  entry: {
    client: [
      'babel-polyfill',
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      path.join(cwd, 'src/client/index.js'),
    ],
  },
  resolve: {
    extensions: ['.json', '.js', '.min.js'],
    modules: [
      path.join(cwd, 'node_modules'),
      path.join(cwd, 'static'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: 'html-loader',
      },
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        include: path.join(cwd, 'src'),
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|icon?)$/i,
        use: [
          {
            loader: 'url-loader',
          },
        ],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
    ],
    noParse: /\.min\.js/,
  },
  plugins: [
    new webpack.DefinePlugin({
      'CONFIG.ASSET_URL': JSON.stringify(ASSET_URL),
      'CONFIG.NODE_ENV': JSON.stringify(NODE_ENV),
      'CONFIG.STATIC_URL': JSON.stringify(STATIC_URL),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    chunkFilename: '[name].[id].js',
    filename: '[name].js',
    path: ASSET_PATH,
    publicPath: ASSET_URL,
  },
};
