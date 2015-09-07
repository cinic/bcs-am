/*jslint node: true */
'use strict';

var gulp = require('gulp'),
  watch = require('gulp-watch'),
  prefixer = require('gulp-autoprefixer'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  coffee = require('gulp-coffee'),
  sourcemaps = require('gulp-sourcemaps'),
  rigger = require('gulp-rigger'),
  jade = require('gulp-jade'),
  cssmin = require('gulp-minify-css'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  rimraf = require('rimraf'),
  browserSync = require("browser-sync"),
  reload = browserSync.reload;

var path = {
  build: {
    html: 'build/',
    js: 'build/Content/js/',
    css: 'build/Content/css/',
    img: 'build/Content/img/',
    fonts: 'build/Content/fonts/',
    vendor_js: 'build/Content/js/vendor/',
    vendor_css: 'build/Content/css/vendor/'
  },
  src: {
    html: ['source/template/*.jade', '!source/template/_*.jade'],
    js: ['source/js/*.coffee', '!source/js/*/_*.coffee'],
    style: 'source/style/*.scss',
    img: 'source/img/**/*.*',
    fonts: 'source/fonts/**/*.*'
  },
  vendor: {
    js: 'source/js/vendor/*.js',
    css: 'source/style/vendor/*.scss'
  },
  watch: {
    html: 'source/**/*.jade',
    js: 'source/js/**/*.coffee',
    vendor_js: 'source/js/vendor/*.js',
    style: 'source/style/**/*.scss',
    vendor_style: 'source/style/vendor/*.scss',
    img: 'source/img/**/*.*',
    fonts: 'source/fonts/**/*.*'
  },
  clean: './build'
};

var config = {
  server: {
    baseDir: "./build"
  },
  tunnel: true,
  host: 'localhost',
  port: 9000,
  logPrefix: "Front Server"
};

gulp.task('webserver', function () {
  browserSync(config);
});

gulp.task('clean', function (cb) {
  rimraf(path.clean, cb);
});

gulp.task('html:build', function () {
  gulp.src(path.src.html)
    .pipe(jade({
      pretty: true
    }))  // Собираем Jade только в папке ./assets/template/ исключая файлы с _*
    .on('error', console.log) // Если есть ошибки, выводим и продолжаем
    .pipe(gulp.dest(path.build.html)) // Записываем собранные файлы
    .pipe(reload({stream: true})); // даем команду на перезагрузку страницы
});

gulp.task('js:build', function () {
  gulp.src(path.src.js)
    .pipe(rigger())
    //.pipe(sourcemaps.init())
    //.pipe(uglify())
    //.pipe(sourcemaps.write())
    .pipe(coffee({bare: true}).on('error', console.log))
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({stream: true}));
});

gulp.task('vendor:js:build', function () {
  gulp.src(path.vendor.js)
    .pipe(gulp.dest(path.build.vendor_js))
    .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
  gulp.src(path.src.style)
    //.pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: ['source/style/'],
      //outputStyle: 'compressed',
      outputstyle: 'expanded',
      //sourceMap: true,
      errLogToConsole: true
    }))
    .pipe(prefixer())
    //.pipe(cssmin())
    //.pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({stream: true}));
});

gulp.task('vendor:style:build', function () {
  gulp.src(path.vendor.css)
    .pipe(sass({
      includePaths: ['source/style/'],
      outputstyle: 'expanded',
      errLogToConsole: true
    }))
    .pipe(prefixer())
    .pipe(gulp.dest(path.build.vendor_css))
    .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
  gulp.src(path.src.img)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()],
      interlaced: true
    }))
    .pipe(gulp.dest(path.build.img))
    .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function () {
  gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts));
});

gulp.task('build', [
  'html:build',
  'js:build',
  'style:build',
  'fonts:build',
  'image:build',
  'vendor:js:build',
  'vendor:style:build'
]);


gulp.task('watch', function () {
  watch([path.watch.html], function (event, cb) {
    gulp.start('html:build');
  });
  watch([path.watch.style], function (event, cb) {
    gulp.start('style:build');
  });
  watch([path.watch.js], function (event, cb) {
    gulp.start('js:build');
  });
  watch([path.watch.vendor_js], function (event, cb) {
    gulp.start('vendor:js:build');
  });
  watch([path.watch.vendor_style], function (event, cb) {
    gulp.start('vendor:style:build');
  });
  watch([path.watch.img], function (event, cb) {
    gulp.start('image:build');
  });
  watch([path.watch.fonts], function (event, cb) {
    gulp.start('fonts:build');
  });
});

gulp.task('default', ['build', 'webserver', 'watch']);
