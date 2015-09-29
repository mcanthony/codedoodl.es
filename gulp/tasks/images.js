var changed  = require('gulp-changed');
var gulp     = require('gulp');
var imagemin = require('gulp-imagemin');
var gzip     = require('gulp-gzip');
var pngcrush = require('imagemin-pngcrush');
var pkg      = require('../../package.json');

gulp.task('images', function() {
  var dest = pkg.folders.dest+'/static/img';

  return gulp.src(pkg.folders.src+'/img/**')
    .pipe(changed(dest))
    .pipe(imagemin({
        use: [pngcrush()]
    }))
    .pipe(gzip({ append: false }))
    .pipe(gulp.dest(dest));
});
