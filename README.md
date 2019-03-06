
# hydrus.js

[![npm version](https://badge.fury.io/js/hydrus.js.svg)](https://www.npmjs.com/package/hydrus.js)

node.js module for interacting with the hydrus network api

currently implements [all v2 api functions](https://hydrusnetwork.github.io/hydrus/help/client_api.html)

| Function | Api Version | Implemented? |
| --- | --- |--- |
| API_VERSION | 1 | ✔️ |
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

## example
```javascript
const hydrusjs = require("hydrus.js")
var client = new hydrusjs({
  key: 'eb79e9e2a40dddd159299408db072ed6e6573d488b50db499f70a211ba1fa1da',
});
client.api_version((response) => {
  console.log(response); // returns { version: 2 }
});
```
    

## testing

```bash
npm test
npm run mocha
```

and supply a client access key when prompted
