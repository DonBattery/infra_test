'use strict';

const express = require('express');
const app = express();

app.get('/', (req, res) =>  {
  res.send('Hi');
});

app.get('/fizzbuzz/:num', (req, res) => {
  let response = '';
  if (isNaN(req.params.num)) {
    response = `${req.params.num} is not a number`
  } else {
    if (req.params.num % 3 == 0) {
      response += 'fizz';
    }
    if (req.params.num % 5 == 0) {
      response += 'buzz';
    }
  }
  res.send(response);
});

module.exports = {
  app
}