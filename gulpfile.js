const gulp = require('gulp');
const merge = require('gulp-merge-json');
const browserSync = require('browser-sync');
const ejs = require("gulp-ejs");
const rename = require('gulp-rename');
 
function mergeGulpFiles() {
  return gulp.src('jsonFiles/*.json')
    .pipe(merge())
    .pipe(gulp.dest('./dist'));
}
function browser() {
  browserSync.init({
    server: { baseDir: './dist/' },
    reloadDebounce: 2000
  })
}

function parseEjs() {
  return gulp.src('source/**.ejs')
  .pipe(ejs({ title: 'gulp-ejs' }))
  .pipe(rename({ extname: '.html' }))
  .pipe(gulp.dest('./dist'))
}

function browserSyncReload(done) {
  browserSync.reload();
  done();
}

function watch() {
  return gulp.watch(['source/*.ejs', 'source/**/*.ejs']).on('change', gulp.series(parseEjs, browserSyncReload));
}
exports.default = gulp.parallel(mergeGulpFiles, parseEjs, browser, watch)
exports.build = gulp.parallel(mergeGulpFiles, parseEjs)