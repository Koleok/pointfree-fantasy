'use strict';
const webpack = require('webpack'),
  path = require('path'),
  fs = require('fs');

const buildModMap = (result, mod) => Object.assign({}, result, {
  [mod]: `commonjs ${mod}`
});

const nodeModules = fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .reduce(buildModMap, {});

module.exports = {
  entry: './src',
  target: 'node',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'build.js'
  },

  module: {
    loaders: [{
      loader: 'json-loader',
      test: /.json$/
    }, {
      loader: 'babel-loader',
      test: /.js$/,
      query: {
        presets: ['es2015', 'stage-2'],
      }
    }]
  },
  externals: nodeModules,
  plugins: [
        new webpack.IgnorePlugin(/\.(css|less)$/),
        new webpack.BannerPlugin(
      'require("source-map-support").install();', {
        raw: true,
        entryOnly: false
      })
  ],
  devtool: 'sourcemap'
}
