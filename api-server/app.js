var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const lib = require('../lib');

var app = express();

app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.post(function(req, res) {
  let {url} = req.body;
  if (url) {
    throw new Error("Supplied 'url' property must not be empty");
  }
  lib.triggerJob(url, function(err, jobid) {
    if(err){
      throw err;
    }
    res.end(`Job started ${jobid}`);
  });

})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
