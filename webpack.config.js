var webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: {
    binaryFetch: './src/binaryFetch.js',
    binaryFetchGlobal: './src/binaryFetchGlobal.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist/'
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
      include: /binaryFetchGlobal.js$/,
      minimize: true
    })
  ]
};
