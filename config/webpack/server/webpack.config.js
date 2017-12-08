const nodeExternals = require('webpack-node-externals');
const path = require('path');
// const PathOverridePlugin = require('path-override-webpack-plugin');
const fittingsCompiler = require('./webpack.fittings.js');
const webpack = require('webpack');

const cwd = process.cwd();

// For dynamic public paths: https://webpack.js.org/guides/public-path/
const ASSET_URL = process.env.ASSET_URL || '/assets';
const ASSET_PATH = process.env.ASSET_PATH || path.resolve(cwd, 'assets');
const STATIC_PATH = process.env.STATIC_PATH || path.resolve(cwd, 'static');
const WATCH = (process.env.NODE_ENV === 'development');

const serverCompiler = {
  target: 'node',
  cache: false,
  devtool: 'source-map',
  watch: WATCH,
  entry: {
    server: [
      'babel-polyfill',
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
        test: /\.html$/i,
        use: 'html-loader'
      },
      {
        test: /\.ejs$/i,
        use: {
          loader: 'html-loader',
          options: {
            attrs: ['img:src', 'link:href', 'script:src'],
            interpolate: true
          }
        }
      },
      {
        test: /\.jsx?$/i,
        use: 'babel-loader',
        include: path.join(cwd, 'src'),
        exclude: /node_modules/
      },
      {
        test: /\.json$/i,
        use: 'json-loader',
        exclude: /node_modules/
      },
      {
        test: /\.y(a)?ml$/i,
        use: 'yml-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|icon?)$/i,
        use: 'url-loader'
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
    ],
    noParse: /\.min\.js/,
  },
  externals: [ nodeExternals() ],
  plugins: [
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
      'process.env.ASSET_URL': JSON.stringify(ASSET_URL),
      'process.env.STATIC_PATH': JSON.stringify(STATIC_PATH)
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  output: {
    chunkFilename: '[name].[id].js',
    filename: '[name].js',
    library: 'Server',
    libraryTarget: 'commonjs-module',
    path: ASSET_PATH,
    publicPath: ASSET_URL,
  }
};
module.exports = [serverCompiler, fittingsCompiler];
