const _ = require('lodash');
const path = require('path');
const webpack = require('webpack');

const VERBOSE = process.argv.includes('--verbose');

const config = {
  stats: {
    colors: true,
    reasons: true,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE
  },
  context: path.resolve(__dirname, '../'),
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        loader: 'babel-loader',
        options: JSON.stringify({
          presets: [
            'es2015'
          ]
        })
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /binary-fetch.min.js$/,
      minimize: true
    })
  ]
};

const libConfig = _.assign({}, config, {
  entry: {
    'binary-fetch': path.resolve(__dirname, '../src/binaryFetch.js')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../lib/'),
    libraryTarget: 'commonjs2'
  }
});

const globConfig = _.assign({}, config, {
  entry: {
    'binary-fetch.min': path.resolve(__dirname, '../src/binaryFetchGlobal.js')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../lib/')
  }
});

module.exports = [libConfig, globConfig];
