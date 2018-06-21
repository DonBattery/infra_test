'use strict';

const app = require('../app').app;
const expect = require('chai').expect;
const request = require('request');

const appURL = 'http://localhost:3030';

const fizzbuzzURL = appURL + '/fizzbuzz';
const countURL = appURL + '/count';
const runURL = appURL + '/run';

describe('Endpoint /count', function() {
  let body_a = {data : "a"};
  it('{data: "a"} returns {a: 1}', function() {
    request.post({url: countURL, formData: body_a}, function(error, response, body) {
      expect(body).to.equal('{a: 11}');
      done();
    });
  });
});

