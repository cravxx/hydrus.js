var chai = require('chai');
var { assert } = chai;


var Hydrus_Api = require('./index.js');

var C = new Hydrus_Api({
  key: 'your api key',
});

describe('test api calls', function() {
  context('api version', function(){
    it('returns a number', function() {
      C.api_version(function(res){
        assert.isNumber(res);
      });
    });
  });
});
