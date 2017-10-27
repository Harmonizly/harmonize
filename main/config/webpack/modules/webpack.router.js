const nodeExternals = require('webpack-node-externals');
const path = require('path');
const webpack = require('webpack');

const cwd = process.cwd();

const routerCompiler = {
    target: 'node',
    devtool: 'source-map',
    entry: [
      "babel-polyfill",
      path.join(cwd, 'src/server/router')
    ],
    resolve: {
      modules: [
        path.join(cwd, 'node_modules')
      ],
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
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/
        }
      ],
      noParse: /\.min\.js/
    },
    externals: [ nodeExternals() ],
    plugins: [
      new webpack.optimize.ModuleConcatenationPlugin()
    ],
    output: {
      filename: 'router.js',
      libraryTarget: "commonjs2",
      path: path.join(cwd, 'dist/fittings')
    }
};

module.exports = routerCompiler;
