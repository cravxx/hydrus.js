const rp = require('request-promise');
const { GenericApiError, NotEnoughArgumentsError, ApiVersionMismatchError } = require('./util.js');

const default_api_address = 'http://127.0.0.1:45869';

const api_version = 2;

const ENDPOINTS = {

  // Access Management
  API_VERSION: '/api_version',
  REQUEST_NEW_PERMISSIONS: '/request_new_permissions',
  VERIFY_ACCESS_KEY: '/verify_access_key',
  // Adding Files
  ADD_FILE: '/add_files/add_file',
  // Adding Tags
  CLEAN_TAGS: '/add_tags/clean_tags',
  GET_TAG_SERVICES: '/add_tags/get_tag_services',
  ADD_TAGS: '/add_tags/add_tags',
  // Adding URLs
  GET_URL_FILES: '/add_urls/get_url_files',
  GET_URL_INFO: '/add_urls/get_url_info',
  ADD_URL: '/add_urls/add_url',
  ASSOCIATE_URL: '/add_urls/associate_url',
  
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
  IMPORT_URLS: 0,
  IMPORT_FILES: 1,
  ADD_TAGS: 2,
  SEARCH_FILES: 3,
};

module.exports = class Client {
  constructor(options) {
    this.access_key = !('key' in options) ? '' : options['key'];
    this.address = !('address' in options) ? this.default_api_address : options['address'];

    this.api_version((res) => {
      if (res.version > api_version) {
        throw new ApiVersionMismatchError(`You are using an older version of hydrus.js (${api_version}) that may not work with the newer api (${res.version}). Please check if there is an update available!`);
      } else if (api_version > res.version) {
        throw new ApiVersionMismatchError(`This version of hydrus.js (${api_version}) is built for a newer version of the api than what your hydrus installation is currently using (${res.version}). Please update your hydrus.`);
      }
    });

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
    if (this.access_key !== '') {
      if (!(('headers' in options) && 'Hydrus-Client-API-Access-Key' in options.headers)) {
        if (!('headers' in options))
          options['headers'] = {};
        options.headers['Hydrus-Client-API-Access-Key'] = this.access_key;
      }
    }
    rp({
      method: method,
      simple: true,
      timeout: 5000,
      json: true,
      uri: this.address + endpoint,
      headers: options.headers,
      qs: options.queries,
      body: 'data' in options ? options.data : options.json,
    })
      .then((response) => {
        callback(response === undefined ? '' : response);
      })
      .catch((err) => {
        if (err instanceof ApiVersionMismatchError)
          console.error(err.message);
        else
          console.error(new GenericApiError(err));
      });
  }

  //
  // Access Management

  /**
   * Gets the current API version.
   * always returns json
   * (Does not require header)
   * @param {*} callback returns response
   */
  api_version(callback) {
    this.build_call(
      'GET',
      ENDPOINTS.API_VERSION,
      callback
    );
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
    this.build_call(
      'GET',
      ENDPOINTS.REQUEST_NEW_PERMISSIONS,
      callback,
      {
        queries: {
          name: name,
          basic_permissions: JSON.stringify(permissions),
        },
      }
    );
  }

  /**
   * Check if your access key is valid (will check the one you intialized your client with by default)
   * @param {*} callback returns response
   * @param {*} key if you wish, you can pass a specific key you want to check
   */
  verify_access_key(callback, key = '') {
    var options =
      (key !== '') ? {headers: {'Hydrus-Client-API-Access-Key': key}} : {};
    this.build_call(
      'GET',
      ENDPOINTS.VERIFY_ACCESS_KEY,
      callback,
      options
    );
  }

  //
  // Adding Files

  /**
   * Tell the client to import a file.
   * supply a json with either bytes : *file bytes* 
   * or path: *file path*
   * @param {*} file path to the file
   * @param {*} callback returns response
   */
  add_file(passed_options, callback) {
    this.build_call(
      'POST',
      ENDPOINTS.ADD_FILE,
      callback,
      'path' in passed_options ? 
        {
          json: {
            path: passed_options.path,
          },
        }
        :
        {
          headers: {
            'Content-Type': 'application/octet-stream',
          },
          data: passed_options.bytes,
        }
    );
  }

  //
  // Adding Tags

  /**
   * Ask the client about its tag services
   * @param {*} callback returns response
   */
  get_tag_services(callback) {
    this.build_call(
      'GET',
      ENDPOINTS.GET_TAG_SERVICES,
      callback
    );
  }

  //
  // Adding URLs

  /**
   * Ask the client about a URL's files.
   * @param {*} url url you want to check
   * @param {*} callback returns response
   */
  get_url_files(url, callback) {
    this.build_call(
      'GET',
      ENDPOINTS.GET_URL_FILES,
      callback,
      {
        queries: {
          url: url,
        },
      }
    );
  }

  /**
   * Ask the client for information about a URL.
   * @param {*} url url you want to check
   * @param {*} callback returns response
   */
  get_url_info(url, callback) {
    this.build_call(
      'GET',
      ENDPOINTS.GET_URL_INFO,
      callback,
      {
        queries: {
          url: url,
        },
      }
    );
  }

  /**
   * Tell the client to 'import' a URL. This triggers the exact same routine as drag-and-dropping a text URL onto the main client window.
   * @param {*} url the url you want to import
   * @param {*} callback returns response
   */
  add_url(url, callback) {
    this.build_call(
      'POST',
      ENDPOINTS.ADD_URL,
      callback,
      {
        json: {
          url: url,
        },
      }
    );
  }

  /**
   * Manage which URLs the client considers to be associated with which files.
   * @param {*} actions contains 'to_add' or 'to_delete' actions for urls. can be single urls or list
   * @param {*} hash the hash of the file you want to edit
   */
  associate_url(actions, _hash, callback) {
    var json = {};
    if (!('to_add' in actions || 'to_delete' in actions)) {
      throw new NotEnoughArgumentsError('You must have at least one \'to_delete\' or \'to_add\' argument');
    } else {
      if ('to_add' in actions) {
        if (typeof actions.to_add === 'object') {
          if (Object.keys(actions.to_add).length > 1) {
            json.urls_to_add = actions.to_add;
          } else {
            json.url_to_add = actions.to_add[0];
          }
        } else {
          json.url_to_add = actions.to_add;
        }
      }
      if ('to_delete' in actions) {
        if (typeof actions.to_delete === 'object') {
          if (Object.keys(actions.to_delete).length > 1) {
            json.urls_to_delete = actions.to_delete;
          } else {
            json.url_to_delete = actions.to_delete[0];
          }          
        } else {
          json.url_to_delete = actions.to_delete;
        }
      }
      if (typeof _hash === 'object') {
        if (Object.keys(_hash).length > 1) {
          json.hashes = _hash;
        } else {
          json.hash = _hash[0];
        }
      } else {
        json.hash = _hash;
      }
    }
    console.log(JSON.stringify(json, null, 4));
    this.build_call(
      'POST',
      ENDPOINTS.ASSOCIATE_URL,
      callback,
      {
        json,
      }
    );
  }
  
};
