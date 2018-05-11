var gulp       = require('gulp')
var browserify = require('gulp-browserify')

gulp.task('default', function () {
  gulp.src('./src/main.js')
    .pipe(browserify({ transform: ['vueify', 'babelify', 'aliasify'] }))
    .pipe(gulp.dest('./dist'))
})