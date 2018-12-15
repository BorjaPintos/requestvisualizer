var express = require('express');
var path = require('path');
var logger = require('morgan');
var config = require('./config');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));


//get body
app.use(function(req, res, next){
  let body = [];
  req.body="";
  req.on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    req.body = body;
    next();
  });
});

app.use('/', routes);

app.use(function(err, req, res, next) {
  res.statusCode = err.status || 500;
  res.write(err.message);
  res.end();
});


app.set('port', config.server.port);
var server = app.listen(app.get('port'), function() {
	'use strict';
	console.log('Express server listening on port ' + server.address().port);
});
