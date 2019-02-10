"use strict";

const request = require('request');

const _api = {
  "BASE": "http://127.0.0.1:45869",
  "API_VERSION": "/api_version",
  "VERIFY_KEY": "/verify_access_key",
  "URL_INFO": "/add_urls/get_url_info",
  "ADD_URL": "/add_urls/add_url",
  "REQUEST_PERMISSIONS": "/request_new_permissions",
  "FILE_SEARCH": "",
  "FILE_METADATA": "",
  "FILE": "",
  "THUMBNAIL": "",
  "ADD_TAGS": "",
  "ADD_FILE": ""
}

class Client {
  
  constructor(access_key){
    this.access_key = access_key;
  }

  build_call(method, endpoint, callback, options={}) {
    options["headers"] = { 'Hydrus-Client-API-Access-Key': this.access_key }
    request({
      method: method,
      uri: _api["BASE"] + endpoint,
      headers: options["headers"],
      qs: options["params"],
      json: options["json"]     
    }, function (error, response, body) {
      if (error || response.statusCode !== 200) {
        return callback(error || {statusCode: response.statusCode});
      }
      callback(null, body);  
    });
  }

  verify_access_key(url) {
    this.build_call('GET', _api["VERIFY_KEY"], function(err, body) {
      if (err) {
        console.log(`error: ${err}`);
      } else {
        console.log(body); 
        return body;
      }
    });
  }

  get_url_info(url) {
    var options = {};
    options["params"] = {'url': url};
    this.build_call('GET', _api["URL_INFO"], function(err, body) {
      if (err) {
        console.log(`error: ${err}`);
      } else {
        console.log(body); 
        return body;
      }
    }, options);
  }

  add_url(url) {
    var options = {};
    options["json"] = {'url': url};
    this.build_call('POST', _api["ADD_URL"], function(err, body) {
      if (err) {
        console.log(`error: ${err}`);
      } else {
        console.log(body); 
        return body;
      }
    }, options);
  }

  api_version() {
    this.build_call('GET', _api["API_VERSION"], function(err, body) {
      if (err) {
        console.log(`error: ${err}`);
      } else {
        console.log(body); 
        return body;
      }
    });
  }

}

module.exports=Client;