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

const PERMISSIONS = {
  IMPORT_FILES: 0,
  ADD_TAGS: 1,
  IMPORT_URLS: 2,
  SEARCH_FILES: 3
}

const isJSON = (str, callback) => {
  try {
      callback (JSON.parse(str));
  } catch (e) {
      callback (null);
  }
}

module.exports = class Client {
  
  constructor(access_key=undefined){
    this.access_key = access_key;
  }

  get PERMISSIONS() {
    return PERMISSIONS;
  }

  build_call(method, endpoint, callback, options={}) {
    if(this.access_key !== undefined && !('headers' in options))
      options["headers"] = { 'Hydrus-Client-API-Access-Key': this.access_key }    
    request({
      method: method,
      uri: _api["BASE"] + endpoint,
      headers: options["headers"],
      qs: options["queries"],
      json: options["json"]     
    }, function (error, response, body) {
      var err = {
        'error': error,
        'status_code' : response.statusCode,
        'body' : body
      }
      callback(error || response.statusCode != 200 ? err : null, body);
    });
  }

  get_permissions(name, permissions, callback) {
    var options = {};
    options["queries"] = {
      'name': name,
      'basic_permissions': JSON.stringify(permissions)
    };
    this.build_call('GET', _api["REQUEST_PERMISSIONS"], function(err, body) {
      if(err) {
        console.log(`API Error: ${JSON.stringify(err)}`)
      } else {
        isJSON(body, function(result) {          
          if(result != null){
            callback(result)
          }else{
            callback(body)
          }
        });
      }    
    }, options);
  }

  verify_access_key(callback, key=null) {
    var options = {};
    if(key != null)
      options["headers"] = {'Hydrus-Client-API-Access-Key': key};
    this.build_call('GET', _api["VERIFY_KEY"], function(err, body) {
      if(err) {
        console.log(`API Error: ${JSON.stringify(err)}`)
      } else {
        isJSON(body, function(result) {          
          if(result != null){
            callback(result)
          }else{
            callback(body)
          }
        });
      }    
    }, options);
  }

  get_url_info(url, callback) {
    var options = {};
    options["queries"] = {'url': url};
    this.build_call('GET', _api["URL_INFO"], function(err, body) {
      if(err) {
        console.log(`API Error: ${JSON.stringify(err)}`)
      } else {
        isJSON(body, function(result) {          
          if(result != null){
            callback(result)
          }else{
            callback(body)
          }
        });
      }      
    }, options);
  }

  add_url(url, callback) {
    var options = {};
    options["json"] = {'url': url};
    this.build_call('POST', _api["ADD_URL"], function(err, body) {
      if(err) {
        console.log(`API Error: ${JSON.stringify(err)}`)
      } else {
        callback(body)
      }    
    }, options);
  }

  api_version(callback) {
    this.build_call('GET', _api["API_VERSION"], function(err, body) {
      if(err) {
        console.log(`API Error: ${JSON.stringify(err)}`)
      } else {
        callback(body)
      }    
    });
  }

}
