
# hydrus.js

[![npm version](https://badge.fury.io/js/hydrus.js.svg)](https://www.npmjs.com/package/hydrus.js) 
[![hydrus api](https://img.shields.io/badge/client%20api-8-FF9400.svg)](https://hydrusnetwork.github.io/hydrus/help/client_api.html)
[![hydrus](https://img.shields.io/badge/hydrus-357-FF9400.svg)](https://github.com/hydrusnetwork/hydrus/releases/)

node.js module for interacting with the hydrus network api

| FUNCTION | API |  |
| --- | --- |--- |
| API_VERSION | 1 | ✔️ |
| SESSION_KEY | 8 | ✔️ |
| REQUEST_NEW_PERMISSIONS | 1 | ✔️ |
| VERIFY_ACCESS_KEY | 1 | ✔️ |
| ADD_FILE | 1 | ✔️ |
| CLEAN_TAGS | 2 | ✔️ |
| GET_TAG_SERVICES | 1 | ✔️ |
| ADD_TAGS | 2 | ✔️ |
| GET_URL_FILES | 1 | ✔️ |
| GET_URL_INFO | 1 | ✔️ |
| ADD_URL | 1 | ✔️ |
| ASSOCIATE_URL | 2 | ️️️️️✔️ |
| GET_PAGES | 7 | ️️️️️✔️ |
| SEARCH_FILES | 3 | ️️️️️✔️ |
| FILE_METADATA | 4 | ️️️️️✔️ |
| FILE | 4 | ️️️️️✔️ |
| THUMBNAIL | 4 | ️️️️️✔️ |

## example
```javascript
const hydrus = require("hydrus.js")
var client = new hydrus({
  key: 'eb79e9e2a40dddd159299408db072ed6e6573d488b50db499f70a211ba1fa1da',
});
client.api_version((response) => {
  console.log(response); // returns { version: 8 }
});
```