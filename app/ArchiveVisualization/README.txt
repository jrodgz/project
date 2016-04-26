Get Node and npm.
From the toplevel directory execute npm install.
It will download everything.
Then executing the build command that is listed in the package.json file it will build all the things.

If you want to see if stuff wen wrong then have these environment vars DEBUG=nodejade,express,jade,node:*;= for node

In the build directory there is a server.js file run it using node and then go to http://localhost:3000/
From there all you gotta do is enter in the sheet url and bingo!