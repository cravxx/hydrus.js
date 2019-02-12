const rp = require('request-promise');

const default_api_address = 'http://127.0.0.1:45869';

const ENDPOINTS = {
  API_VERSION: '/api_version',
  VERIFY_KEY: '/verify_access_key',
  URL_INFO: '/add_urls/get_url_info',
  ADD_URL: '/add_urls/add_url',
  REQUEST_PERMISSIONS: '/request_new_permissions',
  TAG_SERVICES: '/add_tags/get_tag_services',
  FILE_SEARCH: '',
  FILE_METADATA: '',
  FILE: '',
  THUMBNAIL: '',
  ADD_TAGS: '',
  ADD_FILE: '/add_files/add_file',
};

const FILE_STATUS = {
  NOT_IN_DATABASE: 0,
  SUCCESSFUL: 1,
  ALREADY_IN_DATABASE: 2,
  PREVIOUSLY_DELETED: 3,
  FAILED: 4,
  VETOED: 7,
};

const URL_TYPE = {
  POST_URL: 0,
  FILE_URL: 2,
  GALLERY_URL: 3,
  WATCHABLE_URL: 4,
  UNKNOWN_URL: 5,
};

const PERMISSIONS = {
  IMPORT_FILES: 0,
  ADD_TAGS: 1,
  IMPORT_URLS: 2,
  SEARCH_FILES: 3,
};

const isJSON = (str, callback) => {
  try {
    callback(JSON.parse(str));
  } catch (e) {
    callback(null);
  }
};

module.exports = class Client {
  constructor(options) {
    this.access_key = !('key' in options) ? '' : options['key'];
    this.address = !('address' in options) ? this.default_api_address : options['address'];    
  }

  get default_api_address() {
    return default_api_address;
  }

  get ENDPOINTS() {
    return ENDPOINTS;
  }

  get FILE_STATUS() {
    return FILE_STATUS;
  }

  get URL_TYPE() {
    return URL_TYPE;
  }

  get PERMISSIONS() {
    return PERMISSIONS;
  }

  build_call(method, endpoint, callback, options = {}) {
    if (this.access_key !== '' && !('headers' in options))
      options['headers'] = {'Hydrus-Client-API-Access-Key': this.access_key};
    rp({
      method: method,
      uri: this.address + endpoint,
      headers: options['headers'],
      qs: options['queries'],
      json: options['json'],
    })
      .then(function(response) {
        callback(null, response);
      })
      .catch(function(err) {
        callback(err, null);
      });
  }

  /**
   * Register a new external program with the client.
   * This requires the 'add from api request' mini-dialog
   * under services->review services to be open, otherwise it will 403.
   * @param {*} name descriptive name of your access
   * @param {*} permissions a list of permission identifiers you want to request
   * @param {*} callback returns response
   */
  request_new_permissions(name, permissions, callback) {
    var options = {
      queries: {
        name: name,
        basic_permissions: JSON.stringify(permissions),
      },
    };
    this.build_call(
      'GET',
      ENDPOINTS.REQUEST_PERMISSIONS,
      function(err, body) {
        if (err) {
          console.log(`API Error: ${JSON.stringify(err)}`);
        } else {
          isJSON(body, function(result) {
            if (result != null) {
              callback(result);
            } else {
              callback(body);
            }
          });
        }
      },
      options
    );
  }

  /**
   * Check if your access key is valid (will check the one you intialized your client with by default)
   * @param {*} callback returns response
   * @param {*} key if you wish, you can pass a specific key you want to check
   */
  verify_access_key(callback, key = '') {
    var options =
      key !== '' ? {headers: {'Hydrus-Client-API-Access-Key': key}} : {};
    this.build_call(
      'GET',
      ENDPOINTS.VERIFY_KEY,
      function(err, body) {
        if (err) {
          console.log(`API Error: ${JSON.stringify(err)}`);
        } else {
          isJSON(body, function(result) {
            if (result != null) {
              callback(result);
            } else {
              callback(body);
            }
          });
        }
      },
      options
    );
  }

  /**
   * Ask the client about its tag services
   * __(not yet enabled)__
   * @param {*} callback returns response
   */
  get_tag_services(callback) {
    this.build_call('GET', ENDPOINTS.TAG_SERVICES, function(err, body) {
      if (err) {
        console.log(`API Error: ${JSON.stringify(err)}`);
      } else {
        isJSON(body, function(result) {
          if (result != null) {
            callback(result);
          } else {
            callback(body);
          }
        });
      }
    });
  }

  /**
   * Ask the client about a URL's files.
   * __(not yet enabled)__
   * @param {*} url url you want to check
   * @param {*} callback returns response
   */
  get_url_files(url, callback) {
    var options = {};
    options['queries'] = {url: url};
    this.build_call(
      'GET',
      ENDPOINTS.URL_INFO,
      function(err, body) {
        if (err) {
          console.log(`API Error: ${JSON.stringify(err)}`);
        } else {
          isJSON(body, function(result) {
            if (result != null) {
              callback(result);
            } else {
              callback(body);
            }
          });
        }
      },
      options
    );
  }

  /**
   * Ask the client for information about a URL.
   * @param {*} url url you want to check
   * @param {*} callback returns response
   */
  get_url_info(url, callback) {
    var options = {};
    options['queries'] = {url: url};
    this.build_call(
      'GET',
      ENDPOINTS.URL_INFO,
      function(err, body) {
        if (err) {
          console.log(`API Error: ${JSON.stringify(err)}`);
        } else {
          isJSON(body, function(result) {
            if (result != null) {
              callback(result);
            } else {
              callback(body);
            }
          });
        }
      },
      options
    );
  }

  /**
   * Tell the client to import a file.
   * TODO: should be able to pass bytes as well
   * __(not yet enabled)__
   * @param {*} file path to the file
   * @param {*} callback returns response
   */
  add_file(file, callback) {
    var options = {};
    options['json'] = {path: file};
    this.build_call(
      'POST',
      ENDPOINTS.ADD_FILE,
      function(err, body) {
        if (err) {
          console.log(`API Error: ${JSON.stringify(err)}`);
        } else {
          callback(body);
        }
      },
      options
    );
  }


  /**
   * Tell the client to 'import' a URL. This triggers the exact same routine as drag-and-dropping a text URL onto the main client window.
   * @param {*} url the url you want to import
   * @param {*} callback returns response
   */
  add_url(url, callback) {
    var options = {};
    options['json'] = {url: url};
    this.build_call(
      'POST',
      ENDPOINTS.ADD_URL,
      function(err, body) {
        if (err) {
          console.log(`API Error: ${JSON.stringify(err)}`);
        } else {
          callback(body);
        }
      },
      options
    );
  }

  /**
   * Gets the current API version.
   * @param {*} callback returns response
   */
  api_version(callback) {
    this.build_call('GET', ENDPOINTS.API_VERSION, function(err, body) {
      //  will return json in the future
      if (err) {
        console.log(`API Error: ${JSON.stringify(err)}`);
      } else {
        isJSON(body, function(result) {
          if (result != null) {
            callback(result);
          } else {
            callback(body);
          }
        });
      }
    });
  }
};
