const winston = require('winston');

const VERBOSE = process.argv.includes('--verbose');

module.exports = {
  withLabel: new winston.Logger({
    level: VERBOSE ? 'silly' : 'info',
    transports: [
      new (winston.transports.Console)()
    ]
  }),
  noLabel: new winston.Logger({
    level: VERBOSE ? 'silly' : 'info',
    transports: [
      new (winston.transports.Console)({
        formatter: (options) => {
          return options.message;
        }
      })
    ]
  })
};
