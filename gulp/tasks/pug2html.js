const gulp = require('gulp')
const pug = require('gulp-pug')
const plumber = require('gulp-plumber')
const pugLinter = require('gulp-pug-linter')
const bemValidator = require('gulp-html-bem-validator')


module.exports = function pug2html(cb) {
    return gulp.src('src/pages/*.pug')
    .pipe(plumber())
    .pipe(pugLinter({reporter: 'default'}))
    .pipe(pug())
    .pipe(bemValidator())
    .pipe(gulp.dest('build'))
}