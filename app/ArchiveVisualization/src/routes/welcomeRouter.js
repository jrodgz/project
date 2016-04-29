import 'babel-polyfill';
import express from 'express';
import sheetParser from '../vis/sheetParser'
import storage from 'node-persist';


storage.initSync();
var welcomeRouter = express.Router();
var tags = null;
var olap = null;
welcomeRouter.get('/', (req, res, next) => {
   console.log("Got the welcome page");
   res.render('welcomePage', {
      pretty: true,
      title: 'Welcome to cs725 Archive Vis',
      headConent: "Input URL To Google Docs SpreadSheet"
   });
});



welcomeRouter.post('/', (req, res, next)=> {
   let url = req.body.sheetURL;
   let sp = new sheetParser(url);
   
   sp.loadSheet(d => {
      tags = d.graphData.tags;
      olap  = d.tdol;
      storage.setItem('data',JSON.stringify(d));
      res.redirect('/vis');
      console.log("Done");
   });

   console.log(url);
});

welcomeRouter.get('/vis', (req, res, next) => {
   console.log("Got the get vis");
   res.render('vis', {
      pretty: true,
      "tags": tags,
      "olap": olap
   });
});

welcomeRouter.get('/data',(req, res, next)=> {
   console.log("got data");
   res.json(JSON.parse(storage.getItem('data')));
});



module.exports = welcomeRouter;