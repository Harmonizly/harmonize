const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const FlowWebpackPlugin = require('flow-webpack-plugin');

// This is not particularly robust...
const root = process.cwd();

const appCompiler = {
  target: 'node',
  cache: false,
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    path.join(root, 'src/server/main.js')
  ],
  resolve: {
    modules: [
      path.join(root, 'node_modules'),
      path.join(root, 'static')
    ],
    alias: {
      client: path.join(root, 'src/server/client'),
      configuration: path.join(root, 'config'),
      lib: path.join(root, 'src/lib'),
      server: path.join(root, 'src/server/server'),
      services: path.join(root, 'src/services'),
      static: path.join(root, 'static')
    },
    aliasFields: ['browser'],
    extensions: ['.json', '.js', '.min.js']
  },
  module: {
    rules: [
      {
        test: /\.(html|ejs)$/,
        use: 'html-loader'
      },
      {
        test: /\.(ico|gif|png|jpg|jpeg|svg|webp)$/,
        use: [
          {
            loader: 'file?context=static&name=/[path][name].[ext]',
            options: {
              exclude: /node_modules/
            }
          }
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        exclude: /node_modules/
      },
      {
        test: /\.y(a)?ml$/,
        loader: 'yml-loader',
        exclude: /node_modules/
      }
    ],
    noParse: /\.min\.js/
  },
  externals: [ nodeExternals() ],
  // plugins: [
  //    new FlowWebpackPlugin()
  // ],
  output: {
    chunkFilename: '[name].[id].js',
    filename: 'index.js',
    library: 'Server',
    libraryTarget: 'commonjs-module',
    path: path.join(root, 'dist')
  }
};

module.exports = appCompiler;
