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
const WATCH = (process.env.NODE_ENV === 'development');

module.exports = {
  target: 'node',
  mode: NODE_ENV === 'PRODUCTION' ? 'production' : 'development',
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
    extensions: ['.json', '.js', '.min.js'],
    modules: [
      path.join(cwd, 'static'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(graphql|gql)$/,
        use: 'graphql-tag/loader',
        exclude: /node_modules/,
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
        test: /\.js$/i,
        use: 'babel-loader',
        include: [path.join(cwd, 'src')],
      },
      {
        test:    /\.json$/i,
        use:     'json-loader',
        exclude: /node_modules/,
      },
      {
        test:    /\.y(a)?ml$/i,
        use:     'yml-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|icon?)$/i,
        use:  'url-loader',
      },
      {
        test:   /\.svg$/,
        loader: 'svg-inline-loader',
      },
    ],
    noParse: /\.min\.js/,
  },
  externals: [
    nodeExternals()
  ],
  plugins: [
    new webpack.DefinePlugin({
      'CONFIG.ASSET_URL':  JSON.stringify(ASSET_URL),
      'CONFIG.NODE_ENV':   JSON.stringify(NODE_ENV),
      'CONFIG.STATIC_URL': JSON.stringify(STATIC_URL),
    }),
  ],
  optimization: {
    namedModules: true,
    noEmitOnErrors: true,
    concatenateModules: true,
  },
  output: {
    chunkFilename: '[name].[id].js',
    filename:      '[name].js',
    library:       'Server',
    libraryTarget: 'commonjs2',
    path:           ASSET_PATH,
    publicPath:     ASSET_URL,
  },
};
