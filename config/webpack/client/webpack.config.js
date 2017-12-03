const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const PathOverridePlugin = require('path-override-webpack-plugin');
const webpack = require('webpack');

const cwd = process.cwd();

// For dynamic public paths: https://webpack.js.org/guides/public-path/
const ASSET_PATH = process.env.ASSET_PATH || '/dist';

module.exports = {
  target: 'web',
  cache: false,
  devtool: 'source-map',
  entry: {
    client: [
      'babel-polyfill',
      // 'react-hot-loader/patch',
      // 'webpack-hot-middleware/client',
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
        test: /\.html$/,
        use: 'html-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        include: path.join(cwd, 'src'),
        exclude: /node_modules/,
      },
    ],
    noParse: /\.min\.js/,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  output: {
    chunkFilename: '[name].[id].js',
    filename: '[name].js',
    path: path.resolve(cwd, 'dist'),
    publicPath: ASSET_PATH,
  }
};
