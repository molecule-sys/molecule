const gulp = require('gulp');
const webserver = require('gulp-webserver');
const rename = require('gulp-rename');
const gutil = require('gulp-util');
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const postcss = require('gulp-postcss');
const cssnext = require('postcss-cssnext');
const csso = require('gulp-csso');
const postcssimport = require('postcss-import');
const child = require('child_process');

const context = 'sys-manager';

path = {
  dist: `../app/dist/${context}/`,
  config: `./${context}.webpack.config.js`,
  css: {
    source: '../app/src/styles/style.pcss',
    watch: '../app/src/styles/**/*.pcss',
    destination: `../app/dist/${context}/static/css/`,
  },
  fonts: {
    source: '../app/src/fonts/**/*.{woff,woff2}',
    watch: '../app/src/fonts/**/*',
    destination: `../app/dist/${context}/static/fonts`,
  },
  images: {
    source: '../app/src/images/**/*.{jpg,jpe,jpeg,png,gif,svg,ico}',
    watch: '../app/src/images/**/*',
    destination: `../app/dist/${context}/static/images`,
  },
};

gulp.task('webserver', () => {
  gulp.src(path.dist)
    .pipe(webserver({
      host: 'localhost',
      port: 8103,
      fallback: 'index.html',
    }));
});

gulp.task('webpack', () => {
  const webpack = child.spawn('webpack', ['--config', path.config]);
  const webpackLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach(message =>
        gutil.log(`Webpack: ${message}`)
      );
  };

  webpack.stdout.on('data', webpackLogger);
  webpack.stderr.on('data', webpackLogger);
});


gulp.task('css', () => {
  const processors = [
    postcssimport,
    cssnext,
  ];
  gulp.src(path.css.source)
    .pipe(postcss(processors))
    .pipe(csso())
    .pipe(rename({ extname: '.css' }))
    .pipe(gulp.dest(path.css.destination));
});

gulp.task('images', () => {
  gulp.src(path.images.source)
    .pipe(cache(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true,
    })))
    .pipe(gulp.dest(path.images.destination));
});

gulp.task('fonts', () => {
  gulp.src(path.fonts.source)
    .pipe(gulp.dest(path.fonts.destination));
});

gulp.task('watch', () => {
  gulp.watch(path.css.watch, ['css']);
  gulp.watch(path.images.watch, ['images']);
  gulp.watch(path.fonts.watch, ['fonts']);
});

gulp.task('default', ['webpack', 'watch', 'webserver']);
