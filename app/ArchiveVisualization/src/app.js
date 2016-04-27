import 'babel-polyfill';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import PrettyError from 'pretty-error';
import logger from 'morgan';

var welcomePage = require('./routes/welcomeRouter');


const app = global.app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/',welcomePage);
app.set('json spaces', 10);
const pe = new PrettyError();
app.use(function(req, res, next) {
   
   var err = new Error('Not Found');
   err.status = 404;
   next(err);
});

app.use(function(err, req, res, next) {
   console.log(pe.render(err));
   res.status(err.status || 500);
   res.render('error', {
      message: err.message,
      error: err
   });
});

module.exports = app;