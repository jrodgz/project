var babel = require("babel-core");
import path from 'path';

const options = {
   "presets": ["es2015",
      "react",
      "node5",
      "stage-0"
   ],
   "plugins": [
      "transform-runtime"
   ]
};
async function compileES6() {
   babel.transformFile('src/public/js/d3timeline.js', options, function (err, res) {
      console.log(err);
      console.log(res.code);
   });
}

export default compileES6;


