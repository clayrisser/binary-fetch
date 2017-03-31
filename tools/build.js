const webpack = require('webpack');
const clean = require('./clean');
const logger = require('./logger').noLabel;
const run = require('./run');
const webpackConfig = require('./webpack.config.js');

async function build() {
  await run(clean);
  return new Promise((resolve, reject) => {
    webpack(webpackConfig).run((err, stats) => {
      if (err) reject(err);
      logger.info(stats.toString(webpackConfig.stats));
      resolve('built');
    });
  });
}

module.exports = {
  name: 'build',
  job: build
};
