var gulp = require('gulp');
var babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');



gulp.task("scripts",function (){
   return gulp.src('src/public/js/d3timeline.js')
      .pipe(sourcemaps.init())
      .pipe(babel({
         presets: ['es2015']
      }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest("build/public/js"));
});

gulp.task('default', ['scripts']);