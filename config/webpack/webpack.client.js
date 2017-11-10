const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const cwd = process.cwd();
// For dynamic public paths: https://webpack.js.org/guides/public-path/
const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = {
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    './src/client/index.js'
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        include: [ path.resolve(cwd, 'src/client') ],
        exclude: [ path.resolve(cwd,'node_modules') ]
      },
      {
        test: /\.json$/,
        use: 'json-loader',
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        use: 'html-loader',
        exclude: /node_modules/
      }
    ],
    noParse: /\.min\.js/
  },
  plugins: [
    // TODO I really want to re-enable this if we can get it working with the app controller
    // new HtmlWebpackPlugin({
    //   template: './static/index.html',
    //   title: 'Harmonize',
    //   inject: 'body'
    // }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
    })
  ],
  output: {
    chunkFilename: '[name].[id].js',
    filename: 'index.js',
    path: path.resolve(cwd, 'dist/client'),
    publicPath: ASSET_PATH
  },
};
