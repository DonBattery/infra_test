'use strict';

const execute = require('execute-shell-promise');

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
  let statusCode = 200;
  if (!req.body.hasOwnProperty('data')) {
    response = {error: 'No Data provided'};
    statusCode = 400;
  } else {
    response = {letters : getLetters(String(req.body.data))};
  }
  res.status(statusCode).json(response);
});

app.post('/run', (req, res) => {
  if (!req.body.hasOwnProperty('command')) {
    res.status(400).send('No Command provided');
  } else {
    execute(req.body.command).then(stdout => {
      res.send(stdout);
    }).catch(stderr => {
      res.status(400).send(`Invalid command : ${req.body.command}`);
    });
  }
});

module.exports = {
  app
}