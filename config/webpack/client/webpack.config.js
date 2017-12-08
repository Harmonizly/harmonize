const nodeExternals = require('webpack-node-externals');
const path = require('path');
// const PathOverridePlugin = require('path-override-webpack-plugin');
const webpack = require('webpack');

const cwd = process.cwd();

// For dynamic public paths: https://webpack.js.org/guides/public-path/
const ASSET_URL = process.env.ASSET_URL || '/assets';
const ASSET_PATH = process.env.ASSET_PATH || path.resolve(cwd, 'assets');
const STATIC_PATH = process.env.STATIC_PATH || path.resolve(cwd, 'static');

module.exports = {
  target: 'web',
  cache: false,
  devtool: 'source-map',
  entry: {
    client: [
      'babel-polyfill',
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      path.join(cwd, `src/client/index.js`),
    ],
  },
  resolve: {
    modules: [
      path.join(cwd, 'node_modules'),
      path.join(cwd, 'static'),
    ],
    alias: {
      client: path.join(cwd, 'src/client'),
      static: path.join(cwd, 'static'),
    },
    extensions: ['.json', '.js', '.min.js'],
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: 'html-loader'
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
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
    ],
    noParse: /\.min\.js/,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
      'process.env.ASSET_URL': JSON.stringify(ASSET_URL),
      'process.env.STATIC_PATH': JSON.stringify(STATIC_PATH)
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  output: {
    chunkFilename: '[name].[id].js',
    filename: '[name].js',
    path: ASSET_PATH,
    publicPath: ASSET_URL,
  }
};
