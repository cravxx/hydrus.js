var hydrus_api = require("./index.js");

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

readline.question(`Enter an api access key to perform tests: `, (key) => {
  
  var c = new hydrus_api()
  var P = c.PERMISSIONS

  c.api_version(function(response) {
    console.log(response)
  })

  c.verify_access_key(function(response) {
    console.log(response)
  })

  c.verify_access_key(function(response) {
    console.log(response)
  }, key)

  c.add_url("https://images-ext-2.discordapp.net/external/OFQgQQfZdll80-opJXFOKPYCG_32rjT8eQvvYWE-Zxs/http/i.4cdn.org/g/1549666714889.jpg", function(response) {
    console.log(response)
  })

  c.get_url_info("https://images-ext-2.discordapp.net/external/OFQgQQfZdll80-opJXFOKPYCG_32rjT8eQvvYWE-Zxs/http/i.4cdn.org/g/1549666714889.jpg", function(response) {
    console.log(response)
  })

  c.get_permissions("new perms", [P.ADD_TAGS, P.IMPORT_URLS, P.IMPORT_FILES, P.SEARCH_FILES], function(response) {
    console.log(response)
  })

  readline.close()
})