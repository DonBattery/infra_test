const request = require('request');

request('http://localhost:3030/fizzbuzz/15', function(error, response, body) {
  console.log(body);
});