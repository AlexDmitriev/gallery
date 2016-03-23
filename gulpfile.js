var gulp = require('gulp');

var sass = require('gulp-sass');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');

gulp.task('sass', function() {
    return gulp.src('web/stylesheets/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('web/stylesheets/css'));
});

gulp.task('coffee', function() {
    gulp.src('web/scripts/coffee/*.coffee')
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest('web/scripts/js/'));
});

gulp.task('default', ['sass', 'coffee']);

gulp.task('watch', function() {
    gulp.watch('web/scripts/coffee/*.coffee', ['coffee']);
    gulp.watch('web/stylesheets/scss/*.scss', ['sass']);
});

