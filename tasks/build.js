import clean from './clean';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import { run } from 'do-task';
import webpack from 'webpack';
import webpackConfig from '../webpack.config';

const $ = gulpLoadPlugins();

export default async function build() {
  await run(clean);
  await new Promise((resolve, reject) => {
    gulp.src(['./src/binary-fetch.js'])
      // .pipe($.eslint())
      // .pipe($.eslint.format())
      // .pipe($.eslint.failAfterError())
      .pipe($.babel({
        presets: [
          ['es2015', { modules: false }],
          'stage-2',
          'node5'
        ],
        plugins: ['babel-plugin-transform-async-to-generator']
      }))
      .pipe($.uglify().on('error', reject))
      .pipe($.rename({
        basename: 'index',
        extname: '.js'
      }))
      .pipe(gulp.dest('./'))
      .on('end', resolve).on('error', reject);
  });
  await new Promise((resolve, reject) => {
    webpack(webpackConfig).run((err, stats) => {
      if (err) return reject(err);
      console.log(stats.toString(webpackConfig.stats));
      return resolve();
    });
  });
}
