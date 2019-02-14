
# hydrus.js

[![npm version](https://badge.fury.io/js/hydrus.js.svg)](https://www.npmjs.com/package/hydrus.js)

node.js module for interacting with the hydrus network api

currently implements v1 api functions (working towards [v2](https://hydrusnetwork.github.io/hydrus/help/client_api.html) )

| Function | Implemented? |
| --- | --- |
| API_VERSION | ✔️ |
| VERIFY_KEY | ✔️ |
| URL_INFO | ✔️ |
| ADD_URL | ✔️ |
| REQUEST_PERMISSIONS | ✔️ |

## example
```javascript
const hydrusjs = require("hydrus.js")
var client = new hydrusjs({
  key: 'eb79e9e2a40dddd159299408db072ed6e6573d488b50db499f70a211ba1fa1da',
});
client.api_version((response) => {
  console.log(response); // returns { version: 1 }
});
```
    

## testing

```bash
npm test
npm run mocha
```

and supply a client access key when prompted
