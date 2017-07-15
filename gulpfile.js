var gulp = require('gulp');
var del = require('del');
var $ = require('gulp-load-plugins')();

var scripts = [
  './src/js/scripts.js'
];

var vendorScripts = [
  // './node_modules/chart.js/dist/Chart.min.js'
  './node_modules/moment/min/moment.min.js',
  './node_modules/angularjs-slider/dist/rzslider.min.js',
  './node_modules/sweet-scroll/sweet-scroll.min.js',
  './node_modules/angular-moment/angular-moment.min.js'
];

var copy = [
  './src/**/*.html'
];

gulp.task('copy', function () {
  return gulp.src(copy).pipe(gulp.dest('./dist'));
});

gulp.task('styles', function() {
  var options = {
    outputStyle: 'compressed'
  };

  return gulp.src('./src/styles/styles.scss')
    .pipe($.sass(options).on('error', $.sass.logError))
    .pipe($.rename('styles.min.css'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('scripts', function () {
  return gulp.src(scripts)
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'))
    .pipe($.uglify())
    .pipe($.rename('scripts.min.js'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('scripts:vendors', function () {
  return gulp.src(vendorScripts)
    .pipe($.concat('vendors.min.js'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('clean', function () {
  return del('./dist');
});

gulp.task('watch', ['build'], function() {
  gulp.watch(scripts, ['scripts']);
  gulp.watch(copy, ['copy']);
  gulp.watch('./src/styles/*.scss', ['styles']);
});

gulp.task('build', ['scripts:vendors', 'scripts', 'styles', 'copy']);
gulp.task('default', ['build']);
