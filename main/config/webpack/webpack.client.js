const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const cwd = process.cwd();

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
        test: /\.html$/,
        use: 'html-loader',
        exclude: /node_modules/
      }
    ],
    noParse: /\.min\.js/
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './static/index.html',
      title: 'Harmonize',
      inject: 'body'
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  output: {
    path: path.resolve(cwd, 'dist/client'),
    publicPath: path.resolve(cwd, 'dist/client'),
    filename: 'client.js'
  },
};
