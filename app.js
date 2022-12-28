var express = require('express');
var path = require('path');
var logger = require('morgan');
var config = require('./config');
var routes = require('./routes/index');
var fs = require('fs');
var https = require('https');
var app = express();

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

if (config.server.ssl.active) {
	
	https.createServer({
		cert: fs.readFileSync(config.server.ssl.crtpath),
		key: fs.readFileSync(config.server.ssl.keypath),
		ca: fs.readFileSync(config.server.ssl.capath),
		passphrase: config.server.ssl.passphrase
	},app).listen(config.server.port, function(){
		config.server.port
	});
	
} else{

	var server = app.listen(config.server.port, function() {
		'use strict';
	});
}
console.log('Express server listening on port ' + config.server.port);