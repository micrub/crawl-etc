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

app.post('/parse', function(req, res) {
  console.log(req.body);
  let url = req.body.url;
  if (url.length === 0) {
    throw new Error("Supplied 'url' property must not be empty");
  }
  console.log(url);
  const job = lib.addJob({url});
  res.status(200);
  res.json({
    message: `Job started ${job}`,
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
  res.status(500).json({
    message: err.message,
    error: err
  });
});

module.exports = app;
