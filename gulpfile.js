var gulp = require('gulp');
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var eslint = require('gulp-eslint');

gulp.task('build', function() {
  return gulp.src('main.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .pipe(babel())
        .pipe(rename('index.js'))
        .pipe(gulp.dest('./'));
});

gulp.task('default', ['build'], function() {
  gulp.watch('main.js', ['build']);
});
