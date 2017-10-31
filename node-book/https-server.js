var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');

// Create a service (the app object is just a callback).
var app = express();

var options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

app.get('/', (req, res) => {
	res.send('Wow https!')
	console.log('summiy')
})

// Create an HTTP service.
http.createServer(app).listen(8004);
// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(9443);
