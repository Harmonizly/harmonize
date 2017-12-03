const nodeExternals = require('webpack-node-externals');
const path = require('path');
const PathOverridePlugin = require('path-override-webpack-plugin');
const fittingsCompiler = require('./webpack.fittings.js');
const webpack = require('webpack');

const cwd = process.cwd();

// For dynamic public paths: https://webpack.js.org/guides/public-path/
const ASSET_PATH = process.env.ASSET_PATH || '/dist';
const WATCH = (process.env.NODE_ENV === 'development');

const serverCompiler = {
  target: 'node',
  devtool: 'source-map',
  watch: WATCH,
  entry: {
    server: [
      'babel-polyfill',
      // 'react-hot-loader/patch',
      // 'webpack-hot-middleware/server',
      path.join(cwd, `src/server/main.js`),
    ],
  },
  resolve: {
    modules: [
      path.join(cwd, 'node_modules'),
      path.join(cwd, 'static'),
    ],
    alias: {
      client: path.join(cwd, 'src/client'),
      configuration: path.join(cwd, 'config'),
      server: path.join(cwd, 'src/server'),
      static: path.join(cwd, 'static'),
      test: path.join(cwd, 'test'),
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
      {
        test: /\.json$/,
        use: 'json-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.y(a)?ml$/,
        use: 'yml-loader',
        exclude: /node_modules/,
      },
    ],
    noParse: /\.min\.js/,
  },
  externals: [ nodeExternals() ],
  plugins: [
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    chunkFilename: '[name].[id].js',
    filename: '[name].js',
    library: 'Server',
    libraryTarget: 'commonjs-module',
    path: path.resolve(cwd, 'dist'),
    publicPath: ASSET_PATH,
  }
};

module.exports = [serverCompiler, fittingsCompiler];
