'use strict';

const express = require('express');
const app = express();

function getLetters(data) {
  let letterSet = {}
  for (let i = 0; i < data.length; i++) {
    if (data[i] in letterSet) {
      letterSet[data[i]]++;
    } else {
      letterSet[data[i]] = 1;
    }
  }
  return letterSet;  
}

app.use(express.json());

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

app.post('/count', (req, res) => {
  let response = '';
  if (!req.body.hasOwnProperty('data')) {
    response = 'No Data provided';
  } else {
    response = getLetters(String(req.body.data));
  }
  res.send(response);
});

module.exports = {
  app
}