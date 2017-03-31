const fs = require('fs-extra-promise');

async function clean() {
  await fs.remove('./.tmp/');
  await fs.remove('./lib/');
  return 'cleaned';
}

module.exports = {
  name: 'clean',
  job: clean
};
