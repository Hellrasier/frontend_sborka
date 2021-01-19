const gulp = require('gulp')

const pug2html = require('./gulp/tasks/pug2html')
const styles = require('./gulp/tasks/styles')
const script = require('./gulp/tasks/script')
const { series, task } = require('gulp')
const { stream } = require('browser-sync')
const imageMinifier = require('./gulp/tasks/image-minifier')
const server = require('browser-sync').create()
const clean = require('./gulp/tasks/clean')

function serve(cb) {
    
    server.init({
        server: 'build',
        notify: false,
        open: true,
        cors: true
    })
    gulp.watch('src/css/**/*.sass', series(styles)).on('change', server.reload)
    gulp.watch('src/js/**/*.js', series(script)).on('change', server.reload)
    gulp.watch('src/pages/**/*.pug', series(pug2html))
    gulp.watch('build/*.html').on('change', server.reload)
    gulp.watch('src/img/*', series(imageMinifier)).on('change', server.reload)
    return cb
}  
module.exports.build = series(clean, pug2html, styles, script, imageMinifier)
module.exports.start = series(module.exports.build, serve)


