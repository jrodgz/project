/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import path from 'path';
import gaze from 'gaze';
import replace from 'replace';
import Promise from 'bluebird';
import fs from 'fs';

/**
 * Copies static files such as robots.txt, favicon.ico to the
 * output (build) folder.
 */
async function copy({ watch } = {}) {
  const ncp = Promise.promisify(require('ncp'));


  await Promise.all([
    ncp('src/public', 'build/public'),
    ncp('src/views', 'build/views'),
    ncp('package.json', 'build/package.json')
  ]);
  fs.createReadStream('node_modules/jquery/dist/jquery.min.js').pipe(fs.createWriteStream('build/public/js/jquery.min.js'));
  fs.createReadStream('node_modules/bootstrap/dist/js/bootstrap.min.js').pipe(fs.createWriteStream('build/public/js/bootstrap.min.js'));
  fs.createReadStream('node_modules/c3/c3.min.js').pipe(fs.createWriteStream('build/public/js/c3.min.js'));
  fs.createReadStream('node_modules/d3/d3.min.js').pipe(fs.createWriteStream('build/public/js/d3.min.js'));
  fs.createReadStream('node_modules/d3-extended/d3-extended.min.js').pipe(fs.createWriteStream('build/public/js/d3-extended.min.js'));
  fs.createReadStream('node_modules/d3-tip/index.js').pipe(fs.createWriteStream('build/public/js/d3-tip.js'));
  fs.createReadStream('node_modules/d3plus/d3plus.full.min.js').pipe(fs.createWriteStream('build/public/js/d3plus.full.min.js'));
  fs.createReadStream('node_modules/lodash/lodash.min.js').pipe(fs.createWriteStream('build/public/js/lodash.min.js'));
 




  replace({
    regex: '"start".*',
    replacement: '"start": "node server.js"',
    paths: ['build/package.json'],
    recursive: false,
    silent: false,
  });

  if (watch) {
    const watcher = await new Promise((resolve, reject) => {
      gaze('src/views/*.*', (err, val) => err ? reject(err) : resolve(val));
    });
    watcher.on('changed', async (file) => {
      const relPath = file.substr(path.join(__dirname, '../src/views/').length);
      await ncp(`src/views/${relPath}`, `build/views/${relPath}`);
    });
  }
}

export default copy;
