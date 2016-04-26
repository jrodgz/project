var gulp = require('gulp');
var babel = require('gulp-babel');

var paths = {
   scripts: ['src/public/js/d3timeline.js'],
};

async function doGulp() {
   console.log(gulp);
   gulp.task("scripts",function (){
      return gulp.src('src/public/js/d3timeline.js').pipe(babel({
            presets: ['es2015'],
            plugins: ['transform-runtime']
         }))
         .pipe(gulp.dest("build/public/js"));
   });
}

export default doGulp;