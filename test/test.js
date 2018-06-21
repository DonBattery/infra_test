'use strict';

const app = require('../app').app;
const expect = require('chai').expect;
const request = require('request');

const appURL = 'http://localhost:3030';

const fizzbuzzURL = appURL + '/fizzbuzz';
const countURL = appURL + '/count';
const runURL = appURL + '/run';

describe('Infra test API', function() {

  describe('App', function () {    
    let url = appURL;  
    it('App returns statuscode 200', function() {
      request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
      });
    });    
  });
  
  describe('Endpoint /fizzbuzz', function() {
    
    let url3 = fizzbuzzURL + '/3';
    
    it('3 returns fizz', function() {
      request(url3, function(error, response, body) {
        expect(body).to.equal('fizz');
      });
    });
    
    let url5 = fizzbuzzURL + '/5';
    
    it('5 returns buzz', function() {
      request(url5, function(error, response, body) {
        expect(body).to.equal('buzz');
      });
    });
    
    let url15 = fizzbuzzURL + '/15';
    
    it('15 returns fizzbuzz', function() {
      request(url15, function(error, response, body) {
        expect(body).to.equal('fizzbuzz');
      });
    });
    
    let urlsajt = fizzbuzzURL + '/sajt';
    
    it('sajt returns "sajt is not a number"', function() {
      request(urlsajt, function(error, response, body) {
        expect(body).to.equal('sajt is not a number');
      });
    });
    
    let url0 = fizzbuzzURL + '/0';
    
    it('0 returns empty string', function() {
      request(url0, function(error, response, body) {
        expect(body).to.equal('');
        done();
      });
    });
    
  });

});