const gulp = require('gulp');
const connect = require('gulp-connect');
const open = require('open');
const ROOT_DIR = 'app';

gulp.task('serve', function () {
  connect.server({
    root: ROOT_DIR,
    port: 8080
  });
});

gulp.task('open', function() {
  open('http://localhost:8080');
})

gulp.task('generate-service-worker', function(callback) {
  var path = require('path');
  var swPrecache = require('sw-precache');
  var rootDir = ROOT_DIR;

  swPrecache.write(`${rootDir}/service-worker.js`, {
    staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff,json}'],
    stripPrefix: rootDir
  }, callback);
});

gulp.task('default', ['generate-service-worker', 'serve', 'open']);

gulp.task('build', ['generate-service-worker']);