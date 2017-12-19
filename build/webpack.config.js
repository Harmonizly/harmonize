// TODO use webpack merge
const config = require('config');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const webpack = require('webpack');

const cwd = process.cwd();

// For dynamic public paths: https://webpack.js.org/guides/public-path/
const ASSET_PATH = path.join(cwd, config.assets.path);
const ASSET_URL = config.assets.url;
const NODE_ENV = process.env.NODE_ENV || 'development';
const STATIC_URL = config.static.url;
const WATCH = false; // (process.env.NODE_ENV === 'development');

module.exports = {
  target: 'node',
  cache: false,
  devtool: 'source-map',
  watch: WATCH,
  entry: {
    server: [
      'babel-polyfill',
      path.join(cwd, 'src/server/main.js'),
    ],
  },
  resolve: {
    modules: [
      path.join(cwd, 'node_modules'),
      path.join(cwd, 'static'),
    ],
    alias: {
      build: path.join(cwd, 'build'),
      client: path.join(cwd, 'src/client'),
      configuration: path.join(cwd, 'config'),
      server: path.join(cwd, 'src/server'),
      static: path.join(cwd, 'static'),
      tests: path.join(cwd, 'tests'),
    },
    extensions: ['.json', '.js', '.min.js'],
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: 'html-loader',
      },
      {
        test: /\.ejs$/i,
        use: {
          loader: 'html-loader',
          options: {
            attrs: ['img:src', 'link:href', 'script:src'],
            interpolate: true,
          },
        },
      },
      {
        test: /\.jsx?$/i,
        use: 'babel-loader',
        include: path.join(cwd, 'src'),
        exclude: /node_modules/,
      },
      {
        test: /\.json$/i,
        use: 'json-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.y(a)?ml$/i,
        use: 'yml-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|icon?)$/i,
        use: 'url-loader',
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
    ],
    noParse: /\.min\.js/,
  },
  externals: [nodeExternals()],
  plugins: [
    new webpack.DefinePlugin({
      'CONFIG.ASSET_URL': JSON.stringify(ASSET_URL),
      'CONFIG.NODE_ENV': JSON.stringify(NODE_ENV),
      'CONFIG.STATIC_URL': JSON.stringify(STATIC_URL),
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
  },
};
