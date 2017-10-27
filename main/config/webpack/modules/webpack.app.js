const nodeExternals = require('webpack-node-externals');
const path = require('path');
const webpack = require('webpack');

const cwd = process.cwd();

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
  externals: [nodeExternals()],
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  output: {
    chunkFilename: '[name].[id].js',
    filename: 'index.js',
    library: 'Server',
    libraryTarget: 'commonjs-module',
    path: path.join(cwd, `dist/server/`)
  }
};

module.exports = appCompiler;
