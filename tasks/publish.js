import childProcess from 'child_process';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import delay from 'delay';
import _ from 'lodash';

const $ = gulpLoadPlugins();

export default async function publish() {
  await new Promise((resolve, reject) => {
    gulp.src('./package.json')
      .pipe($.bump())
      .pipe($.fn((f) => {
        console.log(_.keys(f));
        console.log(f._contents);
        return f;
      }))
      .pipe(gulp.dest('./'))
      .on('error', reject).on('end', resolve);
  });
  const version = require('../package').version;
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
