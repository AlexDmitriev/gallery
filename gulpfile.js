var gulp = require('gulp');

var sass = require('gulp-sass');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');

gulp.task('sass', function() {
    return gulp.src('web/stylesheets/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('web/stylesheets/css'));
});

gulp.task('coffee', function() {
    gulp.src('web/scripts/coffee/*.coffee')
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest('web/scripts/js/build'));
});

gulp.task('scripts', function() {
    return gulp.src([
        'web/scripts/js/build/app.js',
        'web/scripts/js/build/entities.js',
        'web/scripts/js/build/views.js',
        'web/scripts/js/build/controllers.js',
        'web/scripts/js/build/routes.js'
    ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('web/scripts/js/dist/'));
});

gulp.task('uglify', function() {
    gulp.src('web/scripts/js/dist/app.js')
        .pipe(uglify('app.min.js'))
        .pipe(gulp.dest('web/scripts/js/dist'))
});

gulp.task('default', ['sass', 'coffee', 'scripts', 'uglify']);

gulp.task('watch', function() {
    gulp.watch('web/scripts/coffee/*.coffee', ['coffee']);
    gulp.watch('web/stylesheets/scss/*.scss', ['sass']);
    gulp.watch('web/scripts/js/build/*.js', ['scripts']);
    gulp.watch('web/scripts/js/dist/app.js', ['uglify']);
});

