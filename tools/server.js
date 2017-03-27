var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var config = require('../webpack.config.js');

const PORT = process.env.PORT ? process.env.PORT : '8888';

var server = new WebpackDevServer(webpack(config), {
  contentBase: [
    './dist/',
    './example/'
  ],
  hot: true,
  historyApiFallback: true,
  compress: true,
  clientLogLevel: 'info',
  quiet: false,
  noInfo: false,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  stats: {
    colors: true
  }
});

server.listen(PORT, 'localhost', function(err) {
  if (err) console.error(err);
  console.log('Server running at http://localhost:' + PORT);
});
