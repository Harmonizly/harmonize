const nodeExternals = require('webpack-node-externals');
const PathOverridePlugin = require('path-override-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const cwd = process.cwd();
const ASSET_PATH = process.env.ASSET_PATH || '/';

const appCompiler = {
  target: 'node',
  cache: false,
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    path.join(cwd, `src/server/main.js`)
  ],
  resolve: {
    modules: [
      path.join(cwd, 'node_modules'),
      path.join(cwd, 'static')
    ],
    alias: {
      configuration: path.join(cwd, 'config'),
      static: path.join(cwd, 'static')
    },
    aliasFields: ['browser'],
    extensions: ['.json', '.js', '.min.js']
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        use: 'json-loader',
        exclude: /node_modules/
      },
      {
        test: /\.y(a)?ml$/,
        use: 'yml-loader',
        exclude: /node_modules/
      }
    ],
    noParse: /\.min\.js/
  },
  externals: [ nodeExternals() ],
  plugins: [
    // new PathOverridePlugin(/^static\//, 'dist/client/'),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
    })
  ],
  output: {
    chunkFilename: '[name].[id].js',
    filename: 'index.js',
    library: 'Server',
    libraryTarget: 'commonjs-module',
    path: path.resolve(cwd, 'dist/server'),
    publicPath: ASSET_PATH
  }
};

module.exports = appCompiler;
