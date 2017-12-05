const nodeExternals = require('webpack-node-externals');
const path = require('path');
// const PathOverridePlugin = require('path-override-webpack-plugin');
const webpack = require('webpack');

const cwd = process.cwd();

// For dynamic public paths: https://webpack.js.org/guides/public-path/
const ASSET_URL = process.env.ASSET_URL || '/dist';
const ASSET_PATH = process.env.ASSET_PATH || path.resolve(cwd, 'static');
const BUILD_PATH = process.env.BUILD_PATH || path.resolve(cwd, 'dist');

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
      ASSET_PATH,
    ],
    alias: {
      client: path.join(cwd, 'src/client'),
      static: ASSET_PATH,
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
      'process.env.BUILD_PATH': JSON.stringify(BUILD_PATH)
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  output: {
    chunkFilename: '[name].[id].js',
    filename: '[name].js',
    path: BUILD_PATH,
    publicPath: ASSET_URL,
  }
};
