const gulp = require('gulp')
const terser = require('gulp-terser')
const sourcemaps = require('gulp-sourcemaps')
const babel = require('gulp-babel')
const rename = require('gulp-rename')
const eslint = require('gulp-eslint') 

module.exports = function pug2html(cb) {
    return gulp.src('src/js/*.js')
    .pipe(babel(
        {presets: ['@babel/env']}
    ))
    .pipe(eslint({
        extends: ["standart", "htmlacademy/es6"],
        globals: [
            'jQuery',
            '$'
        ],
    }))
    .pipe(eslint.format())
    .pipe(sourcemaps.init())
        .pipe(terser())
    .pipe(sourcemaps.write())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('build/js/'))
}