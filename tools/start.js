const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('./webpack.config.js');
const logger = require('./logger').noLabel;

const PORT = process.env.PORT ? process.env.PORT : '8888';

async function start() {
  var server = createServer();
  return await runServer(server);
}

module.exports = {
  name: 'start',
  job: start
};

function createServer() {
  return new WebpackDevServer(webpack(config), {
    contentBase: [
      './lib/',
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
    stats: config[0].stats
  });
}

function runServer(server) {
  return new Promise((resolve, reject) => {
    server.listen(PORT, 'localhost', function(err) {
      if (err) console.error(err);
      logger.info('Server running at http://localhost:' + PORT);
      resolve('started');
    });
  });
}
