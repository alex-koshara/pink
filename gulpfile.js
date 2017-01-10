var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var server = require('browser-sync').create();
var svgmin = require('gulp-svgmin');
var svgstore = require('gulp-svgstore');
var sourcemaps = require('gulp-sourcemaps');


gulp.task('less', function () {
  return gulp.src('./less/**/*.less')
    .pipe(sourcemaps.init())
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css'))
    .pipe(server.stream());
});

gulp.task('copy', function() {
  return gulp.src([
    'node_modules/picturefill/dist/picturefill.min.js'
    ], {
      base: 'node_modules/picturefill/dist'
    })
  .pipe(gulp.dest('js/'));
});

gulp.task('symbols', function() {
  return gulp.src('./img/icons/*.svg')
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(gulp.dest('./img'))
});

gulp.task('copy', function() {
  return gulp.src([
    'node_modules/picturefill/dist/picturefill.min.js',
    'node_modules/svg4everybody/dist/svg4everybody.min.js'
    ], {
      base: 'node_modules'
    })
  .pipe(gulp.dest('js/vendor'));
});


gulp.task('svgmin', function() {
  return gulp.src('./img/icons/*.svg')
    .pipe(svgmin());
});

gulp.task('serve', ['less', 'copy', 'symbols'], function() {
  server.init({
    server: '.',
    notify: false,
    open: true,
    ui: false
  });

  gulp.watch('less/**/*.less', ['less']);
  gulp.watch('img/icons/*.svg', ['symbols']).on('change', server.reload);
  gulp.watch('*.html').on('change', server.reload);
});
