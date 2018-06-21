'use strict';

const app = require('../app').app;

const request = require('supertest');

const assert = require('chai').assert;

const _ = require('lodash');


describe('Infra-Test API', () => {

  describe('GET /', () => {
    it('Welcome message', () => {
      return request(app)
        .get('/')
        .expect(200)
        .then(res => {
          assert((res.text == 'Hi'), 'incorrect welcome message returned');
        })
    });
  });

});

describe('Endpoint /fizzbuzz/:num', () => {

  describe('/fizzbuzz/0', () => {
    it('fizzbuzz', () => {
      return request(app)
      .get('/fizzbuzz/0')
      .expect(200)
      .then(res => {
        assert((res.text == 'fizzbuzz'), '0 % 3 == 0 && 0 % 5 == 0');
      });
    });
  });
  
  describe('/fizzbuzz/-1', () => {
    it('Empty string', () => {
      return request(app)
      .get('/fizzbuzz/-1')
      .expect(200)
      .then(res => {
        assert((res.text == ''), 'not an empty string');
      });
    });
  });
  
  describe('/fizzbuzz/sajt', () => {
    it('sajt is not a number', () => {
      return request(app)
      .get('/fizzbuzz/sajt')
      .expect(200)
      .then(res => {
        assert((res.text =='sajt is not a number'), 'should not accept non numeric characters');
      });
    });
  });
  
  describe('/fizzbuzz/3', () => {
    it('fizz', () => {
      return request(app)
      .get('/fizzbuzz/3')
      .expect(200)
      .then(res => {
        assert((res.text == 'fizz'), '3 should be fizz');
      });
    });
  });
  
  describe('/fizzbuzz/5', () => {
    it('buzz', () => {
      return request(app)
      .get('/fizzbuzz/5')
      .expect(200)
      .then(res => {
        assert((res.text == 'buzz'), '5 should be buzz');
      });
    });
  });
  
  describe('/fizzbuzz/15', () => {
    it('fizzbuzz', () => {
      return request(app)
      .get('/fizzbuzz/15')
      .expect(200)
      .then(res => {
        assert((res.text == 'fizzbuzz'), '15 should be fizzbuzz');
      });
    });
  });
  
  describe('/fizzbuzz/9000000.000', () => {
    it('fizzbuzz', () => {
      return request(app)
      .get('/fizzbuzz/9000000.000')
      .expect(200)
      .then(res => {
        assert((res.text == 'fizzbuzz'), 'this should be fizzbuzz');
      });
    });
  });
  
  describe('/fizzbuzz/-9000015.000', () => {
    it('fizzbuzz', () => {
      return request(app)
      .get('/fizzbuzz/-9000015.000')
      .expect(200)
      .then(res => {
        assert((res.text == 'fizzbuzz'), ' this should be fizzbuzz');
      });
    });
  });
  
});

describe('Endpoint /count', () => {
  
  describe('/count with empty load', () => {
    it('No Data provided', () => {
      return request(app)
      .post('/count')
      .set('Accept', 'application/json')
      .expect(400)
      .then(res => {
        assert((res.body.error == 'No Data provided'), 'when the request body has no "data" property, error should be returned');
      });
    });
  });
  
  describe('/count with corrupt data', () => {
    it('No Data provided', () => {
      return request(app)
      .post('/count')
      .set('Accept', 'application/json')
      .send({asd: 'wasd'})
      .expect(400)
      .then(res => {
        assert((res.body.error == 'No Data provided'), 'when the request body has no "data" property, error should be returned');
      });
    });
  });
  
  describe('/count "a"', () => {
    it('{"a":1}', () => {
      return request(app)
      .post('/count')
      .set('Accept', 'application/json')
      .send({data: 'a'})
      .expect(200)
      .then(res => {
        assert(_.isEqual(res.body.letters, {a: 1}), 'should return {a : 1}');
      });
    });
  });
  
  describe('/count "aasd"', () => {
    it('{"a":2,"s":1,"d":1}', () => {
      return request(app)
      .post('/count')
      .set('Accept', 'application/json')
      .send({data: 'aasd'})
      .expect(200)
      .then(res => {
        assert(_.isEqual(res.body.letters, { a: 2, s: 1, d: 1 }), 'should return {"a":2,"s":1,"d":1}');
      });
    });
  });
  
  describe('/count "aasd __ * 123"', () => {
    it('{"1":1,"2":1,"3":1,"a":2,"s":1,"d":1," ":4,"_":2,"*":1}', () => {
      return request(app)
      .post('/count')
      .set('Accept', 'application/json')
      .send({data: 'aasd __ * 123 '})
      .expect(200)
      .then(res => {
         assert(_.isEqual(res.body.letters, { "1": 1, "2": 1, "3": 1, "a": 2, "s": 1, "d": 1, " ": 4, "_": 2, "*": 1 }), 'should return {"1":1,"2":1,"3":1,"a":2,"s":1,"d":1," ":4,"_":2,"*":1}');
      });
    });
  });

});

describe('Endpoint /run', () => {

  describe('/run with empty load', () => {
    it('No Command provided', () => {
      return request(app)
      .post('/run')
      .set('Accept', 'application/json')
      .expect(400)
      .then(res => {
        assert((res.text == 'No Command provided'), 'when the request body has no "command" property, error should be returned');
      });
    });    
  });

  describe('/run "echo sajt"', () => {
    it('Echo sajt', () => {
      return request(app)
      .post('/run')
      .set('Accept', 'application/json')
      .send({command: 'echo sajt'})
      .expect(200)
      .then(res => {
        assert((res.text == 'sajt\n'), '"sajt" shall be displayed');
      });
    });    
  });

  describe('/run "t-rex"', () => {
    it('Invalid command', () => {
      return request(app)
      .post('/run')
      .set('Accept', 'application/json')
      .send({command: 't-rex'})
      .expect(400)
      .then(res => {
        assert((res.text == 'Invalid command : t-rex'), 'Invalid command : t-rex should be seen');
      });
    });    
  });

});

