const nodeExternals = require('webpack-node-externals');
const path = require('path');
// const PathOverridePlugin = require('path-override-webpack-plugin');
const fittingsCompiler = require('./webpack.fittings.js');
const webpack = require('webpack');

const cwd = process.cwd();

// For dynamic public paths: https://webpack.js.org/guides/public-path/
const ASSET_URL = process.env.ASSET_URL || '/dist';
const ASSET_PATH = process.env.ASSET_PATH || path.resolve(cwd, 'static');
const BUILD_PATH = process.env.BUILD_PATH || path.resolve(cwd, 'dist');
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
      ASSET_PATH,
    ],
    alias: {
      client: path.join(cwd, 'src/client'),
      configuration: path.join(cwd, 'config'),
      server: path.join(cwd, 'src/server'),
      static: ASSET_PATH,
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
      'process.env.BUILD_PATH': JSON.stringify(BUILD_PATH)
    }),
    // new HtmlWebpackPlugin({
    //   filename: path.resolve(BUILD_PATH, 'index.html'),
    //   template: path.resolve(cwd, 'static/index.ejs'),
    //   excludeChunks: ['server']
    // }),
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  output: {
    chunkFilename: '[name].[id].js',
    filename: '[name].js',
    library: 'Server',
    libraryTarget: 'commonjs-module',
    path: BUILD_PATH,
    publicPath: ASSET_URL,
  }
};
module.exports = [serverCompiler, fittingsCompiler];
