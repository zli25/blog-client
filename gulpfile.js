var gulp    = require('gulp');
var sync    = require('run-sequence');
var browser = require('browser-sync');
var webpack = require('webpack-stream');
var todo    = require('gulp-todoist');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
  entry: './src/app/app.js',
  js: './src/app/**/*!(.spec.js).js',
  css: './src/app/styles/**/*.scss',
  app: ['./src/app/**/*.{js,scss,html}'],
  dest: './dist',
  copyHtml: './src/index.html',
  assets: './src/app/assets/**/*'
}

gulp.task('todo', function() {
  return gulp.src(paths.js)
    .pipe(todo({silent: false, verbose: true}));
});

gulp.task('webpack', ['todo'], function() {
  return gulp.src(paths.entry)
    .pipe(webpack(require('./webpack.config')))
    .pipe(gulp.dest(paths.dest));
});

gulp.task('serve', function() {
  browser({
    port: process.env.PORT || 4500,
    open: true,
    browser: "google chrome",
    ghostMode: false,
    server: {
      baseDir: 'dist'
    }
  });
});

gulp.task('build-css', function() {
  return gulp.src(paths.css)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dest));
});

gulp.task('watch', function() {
  gulp.watch(paths.app, ['webpack', 'build-css', browser.reload]);
  gulp.watch(paths.copyHtml, ['copy', browser.reload]);
});

gulp.task('copy', function() {

  //copy ico
  gulp.src('./src/*.ico')
    .pipe(gulp.dest(paths.dest));

  //copy html
  gulp.src(paths.copyHtml, { base: 'src' })
    .pipe(gulp.dest(paths.dest));

  //copy assets including images and fonts
  gulp.src(paths.assets, {base: './src/app'})
    .pipe(gulp.dest(paths.dest));


});

gulp.task('default', function(done) {
  sync('webpack', 'build-css', 'copy', 'serve', 'watch', done);
});


