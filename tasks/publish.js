import childProcess from 'child_process';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

export default async function publish() {
  await new Promise((resolve, reject) => {
    gulp.src('./package.json')
      .pipe($.bump())
      .pipe(gulp.dest('./'))
      .on('error', reject).on('end', resolve);
  }).then(() => {
    console.log('yay');
  });

  console.log('waiting . . .');

  const version = require('../package').version;
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
