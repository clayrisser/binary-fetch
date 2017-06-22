import childProcess from 'child_process';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

export default async function publish() {
  await new Promise((resolve, reject) => {
    gulp.src('./package.json')
      .pipe($.bump().on('end', () => console.log('bumped')))
      .pipe(gulp.dest('./').on('end', () => console.log('done')))
      .on('error', reject).on('end', resolve);
  });
  const version = require('../package').version;
  console.log('*************');
  console.log(version);
  await new Promise((resolve, reject) => {
    childProcess.spawn(`git add ./
    git commit -m "v${version}"
    git tag v${version}
    git push
    git push --tags`, {
      stdio: 'inherit',
      shell: true
    }).on('close', resolve).on('error', reject);
  });
}
