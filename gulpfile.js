const gulp = require('gulp');
const connect = require('gulp-connect');
const open = require('open');
const ROOT_DIR = 'app';
const PORT = 5000;

gulp.task('connect', function () {
  connect.server({
    root: ROOT_DIR,
    port: PORT,
    livereload: true
  });
});

gulp.task('open', function() {
  open(`http://localhost:${PORT}`);
});

gulp.task('html', function () {
  return gulp.src('./app/*.html')
    .pipe(connect.reload());
});

gulp.task('css', function () {
  return gulp.src('./app/styles/*.css')
    .pipe(connect.reload());
});
 
gulp.task('watch', function () {
  gulp.watch(['./app/*.html'], ['html']);
  gulp.watch(['./app/styles/*.css'], ['css']);
});

gulp.task('generate-service-worker', function(callback) {
  var path = require('path');
  var swPrecache = require('sw-precache');
  var rootDir = ROOT_DIR;

  swPrecache.write(`${rootDir}/service-worker.js`, {
    staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff,json}'],
    stripPrefix: rootDir
  }, callback);
});

gulp.task('default', ['connect', 'watch', 'open']);

gulp.task('build', ['generate-service-worker']);