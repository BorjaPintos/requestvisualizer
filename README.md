# RequestVisualizer
Simple Server for view complete HTTP request and send different responses

## Installation
npm install

## Run
npm start

## Configuration
File config.js

## Routes:

```bash
/200
For all http methods, it sends empty response with code 200

/500
For all http methods, it sends empty response with code 500

/custom
For all http methods, it sends custom response with code 200

/response
POST, set custom response for the route /custom.

/*
For all http methods, it sends empty response with code 404

/history
GET, visualize last requests with client info, all headers and the body. (note, this route doesn't history
```

### Example
```bash
---------------------------BEGIN:1-------------------------------
Client: 192.168.0.3:61240
Time: Sat Dec 15 2018 12:56:07 GMT+0100 (CET)

POST /200 HTTP/1.1
host: 192.168.0.6:3000
connection: keep-alive
content-length: 11
user-agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:64.0) Gecko/20100101 Firefox/64.0
accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
cache-control: no-cache
content-type: application/json
accept-encoding: gzip, deflate
accept-language: es,en;q=0.9

Hello World
---------------------------BEGIN:0-------------------------------
Client: 192.168.0.3:61021
Time: Sat Dec 15 2018 12:55:48 GMT+0100 (CET)

GET /200 HTTP/1.1
host: 192.168.0.6:3000
connection: keep-alive
cache-control: no-cache
content-type: application/json
user-agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:64.0) Gecko/20100101 Firefox/64.0
accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
accept-encoding: gzip, deflate
accept-language: es,en;q=0.9
```
