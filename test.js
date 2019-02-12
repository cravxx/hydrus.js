var Hydrus_Api = require('./index.js');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question('Enter an api access key to perform tests: ', key => {
  var C = new Hydrus_Api({
    key: 'eb79e9e2a40dddd159299408db072ed6e6573d488b50db499f70a211ba1fa1da',
  });
  var P = C.PERMISSIONS;
  // var U = C.URLTYPE;
  // var I = C.IMPORT_STATUS;

  // new
  // c.get_tag_services(function(response) {
  //   console.log(response)
  // })

  // c.get_url_files("https://images-ext-2.discordapp.net/external/OFQgQQfZdll80-opJXFOKPYCG_32rjT8eQvvYWE-Zxs/http/i.4cdn.org/g/1549666714889.jpg",
  // function(response) {
  //   console.log(response)
  // })

  C.api_version(function(response) {
    console.log(response);
  });

  // backend on these seems to be not working
  // C.verify_access_key(function(response) {
  //   console.log(response);
  // });

  // C.verify_access_key(function(response) {
  //   console.log(response);
  // }, 'f03b3d78c04f72ef18807d57f85fce71016c356c15b59d98bb76bc5870ec8bef');

  C.add_url(
    'https://images-ext-2.discordapp.net/external/OFQgQQfZdll80-opJXFOKPYCG_32rjT8eQvvYWE-Zxs/http/i.4cdn.org/g/1549666714889.jpg',
    function(response) {
      console.log(response);
    }
  );

  C.get_url_info(
    'https://images-ext-2.discordapp.net/external/OFQgQQfZdll80-opJXFOKPYCG_32rjT8eQvvYWE-Zxs/http/i.4cdn.org/g/1549666714889.jpg',
    function(response) {
      console.log(response);
    }
  );

  C.request_new_permissions(
    'new perms',
    [P.ADD_TAGS, P.IMPORT_URLS, P.IMPORT_FILES, P.SEARCH_FILES],
    function(response) {
      console.log(response);
    }
  );

  readline.close();
});
