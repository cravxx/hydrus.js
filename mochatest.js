var chai = require('chai');
var { assert } = chai;


var Hydrus_Api = require('./index.js');

var C = new Hydrus_Api({
  key: 'eb79e9e2a40dddd159299408db072ed6e6573d488b50db499f70a211ba1fa1da',
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
