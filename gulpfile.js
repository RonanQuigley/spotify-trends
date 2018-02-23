// Sass configuration
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
    gulp.src('app/views/styles/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/views/styles'));
});

gulp.task('default', ['sass'], function() {
    gulp.watch('app/views/styles/*.scss', ['sass']);
})