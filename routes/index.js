var express = require('express');
var router = express.Router();
var maxHistory = 100;
var history = [];
var customResponse = "";
var customCode = 200;
var customHeaders = [];


router.get('/history', function(req, res) {
    res.write(toStringHistory());
    res.end();
});

router.all('/200', function(req, res) {
  addToHistory(reqToString(req));
  generateEmptyResponse(res, 200);
});

router.all('/401', function(req, res) {
  addToHistory(reqToString(req));
  generateEmptyResponse(res, 401);
});

router.all('/500', function(req, res) {
  addToHistory(reqToString(req));
  generateEmptyResponse(res, 500);
});

router.all('/custom', function(req, res) {
  addToHistory(reqToString(req));
  generateCustomResponse(res);
});

router.post('/response', function(req, res) {
  addToHistory(reqToString(req));
  customResponse = req.body;
  generateCustomResponse(res);
  res.end();
});

router.post('/code', function(req, res) {
  addToHistory(reqToString(req));
  customCode = req.body;
  if (!Number.isNaN(parseInt(req.body))){
    customCode = parseInt(req.body);
  }
  generateCustomResponse(res);
  res.end();
});

router.post('/headers', function(req, res) {
  addToHistory(reqToString(req));
  try{
    customHeadersJson = JSON.parse(req.body);
    if (customHeadersJson != undefined){
        customHeaders = [];
        customHeadersEntries = Object.entries(customHeadersJson);
        for (i=0;i<customHeadersEntries.length;i++){
          customHeaders[i] =customHeadersEntries[i];
        }
      }
      generateCustomResponse(res);
  } catch (e){
    generateEmptyResponse(res, 400);
  }
  
});

router.all('/*', function(req, res) {
  addToHistory(reqToString(req));
  generateEmptyResponse(res, 404);
});

var generateEmptyResponse = function(res, code){
  res.statusCode = code;
  res.write("");
  res.end();
}

var generateCustomResponse =function(res){
  res.statusCode = customCode;
  addCustomHeaders(res);
  res.write(customResponse);
  res.end();
}

var addCustomHeaders = function(res){
  for (i=0;i<customHeaders.length;i++){
    res.setHeader(customHeaders[i][0], customHeaders[i][1]);
  }
}

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
