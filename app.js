'use strict';

const express = require('express');
const app = express();

const exec = require('child_process').exec;

function runCommand(command, res) {
  exec(command, (err, stdout, stderr) => {
    if (err) {
      res.send(`could not run ${command} : ${err}`);
      return
    }
    res.send(`stdout:\n${stdout}\nstderr:\n${stderr}`);
  });
}

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

app.post('/run', (req, res) => {
  if (!req.body.hasOwnProperty('command')) {
    res.send('No command provided');
  } else {
    runCommand(req.body.command, res);
  }
});

module.exports = {
  app
}