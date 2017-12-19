var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var gulpCopy = require('gulp-copy');


// Development Tasks
// -----------------
gulp.task('sass', function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// Watchers
gulp.task('watch',['browserSync', 'sass'], function(){
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch('src/js/**/*.js', browserSync.reload);

});

// Start browserSync server
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'src'
        },
    })
});

// Optimization Tasks
// ------------------

// Optimizing CSS and JavaScript
gulp.task('useref', function(){

    return gulp.src('src/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.css', minifyCSS()))
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulp.dest('dist'))
});

// Optimizing Images
gulp.task('images', function(){
    return gulp.src('src/images/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
});

// Copying fonts
gulp.task('fonts', function() {
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
});

// Cleaning
gulp.task('clean', function(callback) {
    del('dist');
    return cache.clearAll(callback);
});

gulp.task('clean-dist', function(){
    del(['dist/**/*', '!dist/images', '!dist/images/**/*'])
});

gulp.task('copy', function () {
    gulp.src(['src/css/bootstrap.min.css', 'src/css/bootstrap-theme.min.css'])
        .pipe(gulp.dest('dist/css'))
    gulp.src(['src/js/jqery.min.js', 'src/js/bootstrap.min.js'])
        .pipe(gulp.dest('dist/js'));
});

// Build Sequences
// ---------------
gulp.task('build', function(callback) {
    runSequence('clean-dist',
                'sass',
                'copy',
                ['useref', 'images', 'fonts'],
                callback);
});

gulp.task('default', function (callback) {
    runSequence(['sass','browserSync', 'watch'],
        callback
    )
});