var path = require('path');
var webpack = require('webpack');

const VERBOSE = process.argv.includes('--verbose');

module.exports = {
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
  entry: {
    'binary-fetch': path.resolve(__dirname, '../src/binaryFetch.js'),
    'binary-fetch.min': path.resolve(__dirname, '../src/binaryFetchGlobal.js')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist/')
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: '/node_modules/',
        loaders: ['babel-loader']
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
