import _ from 'lodash';
import path from 'path';
import webpack from 'webpack';

const VERBOSE = process.argv.includes('--verbose') || process.argv.includes('-v');

export default {
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
  context: path.resolve(__dirname),
  entry: {
    'binary-fetch.min': path.resolve(__dirname, './src/binary-fetch-bower.js')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname)
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        loader: 'babel-loader',
        options: JSON.stringify({
          presets: [
            ['es2015', { module: false }],
            'stage-2'
          ],
          plugins: ['transform-async-to-generator']
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
