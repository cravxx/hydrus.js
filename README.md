
# hydrus.js

[![npm version](https://badge.fury.io/js/hydrus.js.svg)](https://www.npmjs.com/package/hydrus.js)

node.js module for interacting with the hydrus network api

currently implements [all api functions](https://hydrusnetwork.github.io/hydrus/help/client_api.html) 

| Function | Implemented? |
| --- | --- |
| API_VERSION | ✔️ |
| VERIFY_KEY | ✔️ |
| URL_INFO | ✔️ |
| ADD_URL | ✔️ |
| REQUEST_PERMISSIONS | ✔️ |

## example
```javascript
const hydrus_api = require("hydrus.js")
var client = new hydrus_api('eb79e9e2a40dddd159299408db072ed6e6573d488b50db499f70a211ba1fa1da')
client.verify_access_key(function(response) {
    console.log(response)
})
```
    

## testing

```bash
npm test
```

and supply a client access key when prompted
