const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const file_include = require('gulp-file-include');
const imagemin = require('gulp-tinypng');

const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');

gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: 'src',
        },
        browser: 'chrome',
    });
});

gulp.task('fonts', function () {
    gulp.src(['src/fonts/*.ttf']).pipe(ttf2woff()).pipe(gulp.dest('src/fonts/'));
    return gulp.src(['src/fonts/*.ttf']).pipe(ttf2woff2()).pipe(gulp.dest('src/fonts/'));
});

gulp.task('styles', function () {
    return gulp
        .src('src/sass/**/*.+(scss|sass)')
        .pipe(sass().on('error', sass.logError))
        .pipe(
            autoprefixer({
                cascade: false,
            }),
        )
        .pipe(gulp.dest('src/css'));
});

gulp.task('html', function () {
    return gulp
        .src('src/html/index.html')
        .pipe(
            file_include({
                indent: true,
            }),
        )
        .pipe(gulp.dest('src/'));
});

gulp.task('compress', function () {
    return gulp
        .src('doc/img/**/*.jpg')
        .pipe(imagemin('GDdff3QrKWvRL1hrqHnvYZyD3y0Q4LXX'))
        .pipe(gulp.dest('src/img/'));
});

gulp.task('watch', function () {
    gulp.watch('src/sass/**/*.+(scss|sass)', gulp.parallel('styles'));
    gulp.watch('src/html/**/*.html', gulp.parallel('html'));
    gulp.watch('src/*.html').on('change', browserSync.reload);
    gulp.watch('src/css/*.css').on('change', browserSync.reload);
});

gulp.task('build', function () {
    gulp.src('src/index.html').pipe(gulp.dest('build'));

    gulp.src('src/favicon.*').pipe(gulp.dest('build'));

    gulp.src('src/css/*.css').pipe(gulp.dest('build/css'));

    gulp.src('src/js/*.js').pipe(gulp.dest('build/js'));

    gulp.src('src/fonts/**.*').pipe(gulp.dest('build/fonts'));

    return gulp.src('src/img/**/**.*').pipe(gulp.dest('build/img'));
});

gulp.task('default', gulp.parallel('html', 'server', 'styles', 'watch'));
