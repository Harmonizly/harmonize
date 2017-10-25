const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

// This is not particularly robust...
const root = process.cwd();

const routerCompiler = {
    target: 'node',
    cache: false,
    devtool: 'source-map',
    entry: [
      "babel-polyfill",
      path.join(root, 'src/server/api/router')
    ],
    resolve: {
      modules: [
        path.join(root, 'node_modules')
      ],
      alias: {
        server: path.join(root, 'src/server'),
        services: path.join(root, 'src/server/services')
      },
      extensions: ['.json', '.js', '.min.js']
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }
      ],
      noParse: /\.min\.js/
    },
    externals: [nodeExternals()],
    plugins: [
      new webpack.EnvironmentPlugin({
        DEBUG: false,
        __CLIENT__: false,
        __SERVER__: true,
        __PRODUCTION__: false,
        __DEV__: true
      })
    ],
    output: {
      filename: 'router.js',
      libraryTarget: "commonjs2",
      path: path.join(root, 'dist/fittings')
    }
};

module.exports = routerCompiler;
