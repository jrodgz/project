var gulp = require('gulp');
var babel = require('gulp-babel');
var jade = require('jade'),
   fs = require('fs');

var paths = {
   scripts: ['src/public/js/d3timeline.js'],
};

async function doGulp() {
   // console.log(gulp);
   // gulp.task("scripts",function (){
   //    return gulp.src('src/public/js/d3timeline.js').pipe(babel({
   //          presets: ['es2015'],
   //          plugins: ['transform-runtime']
   //       }))
   //       .pipe(gulp.dest("build/public/js"));
   // });

   fs.readFile('src/views/vis.jade', 'utf8', function (err, data) {
      if (err) throw err;
      console.log(data);
      html   = jade.renderFile('src/views/vis.jade',);
      console.log(html);
   });
}

export default doGulp;