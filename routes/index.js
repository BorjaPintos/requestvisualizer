var express = require('express');
var router = express.Router();
var request = require('request');
var maxHistory = 100;
var history = [];
var customResponse = "";


router.get('/history', function(req, res) {
    res.write(toStringHistory());
    res.end();
});

router.all('/200', function(req, res) {
  addToHistory(reqToString(req));
  res.write("");
  res.statusCode = 200;
  res.end();
});

router.all('/500', function(req, res) {
  addToHistory(reqToString(req));
  res.write("");
  res.statusCode = 500;
  res.end();
});

router.all('/custom', function(req, res) {
  addToHistory(reqToString(req));
  res.write(customResponse);
  res.statusCode = 200;
  res.end();
});

router.post('/response', function(req, res) {
  addToHistory(reqToString(req));
  customResponse = req.body;
  res.write(customResponse);
  res.statusCode = 200;
  res.end();
});

router.all('/*', function(req, res) {
  addToHistory(reqToString(req));
  res.write("");
  res.statusCode = 404;
  res.end();
});

var addToHistory = function(element){
  if (history.length===maxHistory){
    history.shift();
  }
  history.push(element);
}

var toStringHistory = function(){
  var string = "";
  for (var i=history.length-1;i>=0;i--){
    string+="---------------------------BEGIN:"+i+"-------------------------------\n";
    string+=history[i]+"\n";
  }
  return string;
}

var reqToString = function(req){
  var reqString = "";
  reqString+="Client: " + req.socket._peername.address + ":" + req.socket._peername.port + "\n";
  reqString+="Time: " + req._startTime + "\n";
  reqString+="\n";
  reqString+=req.method + " " + req.url + " HTTP/" + req.httpVersion + "\n";
  headers = Object.entries(req.headers);
  for (i=0;i<headers.length;i++){
    reqString+=headers[i][0]+": "+headers[i][1] + "\n";
  }
  reqString+="\n";
  reqString+=req.body;
  return reqString;
}



module.exports = router;
