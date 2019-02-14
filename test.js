var Hydrus_Api = require('./index.js');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question('Enter an api access key to perform tests: ', key => {
  var C = new Hydrus_Api({
    key: key,
  });
  var P = C.PERMISSIONS;
  // var U = C.URLTYPE;
  // var I = C.IMPORT_STATUS;

  C.get_tag_services((response) => {
    console.log(response);
    console.log('\n\n');
  });

  C.get_url_files('https://images-ext-2.discordapp.net/external/OFQgQQfZdll80-opJXFOKPYCG_32rjT8eQvvYWE-Zxs/http/i.4cdn.org/g/1549666714889.jpg',
    (response) => {
      console.log(response);
      console.log('\n\n');
    });

  C.api_version((response) => {
    console.log(response);
    console.log('\n\n');
  });

  C.verify_access_key((response) => {
    console.log(response);
    console.log('\n\n');
  });

  C.verify_access_key((response) => {
    console.log(response);
    console.log('\n\n');
  }, 'df170503ec86eb494db07de92ed722d76952bc8f3f3aa4a0a4bf46b542372c1f');

  C.add_url(
    'https://images-ext-2.discordapp.net/external/OFQgQQfZdll80-opJXFOKPYCG_32rjT8eQvvYWE-Zxs/http/i.4cdn.org/g/1549666714889.jpg',
    (response) => {
      console.log(response);
      console.log('\n\n');
    }
  );

  C.add_file(
    'C:/example/path/file.png',
    (response) => {
      console.log(response);
      console.log('\n\n');
    }
  );

  C.get_url_info(
    'https://images-ext-2.discordapp.net/external/OFQgQQfZdll80-opJXFOKPYCG_32rjT8eQvvYWE-Zxs/http/i.4cdn.org/g/1549666714889.jpg',
    (response) => {
      console.log(response);
      console.log('\n\n');
    }
  );

  C.request_new_permissions(
    'new perms',
    [P.ADD_TAGS, P.IMPORT_URLS, P.IMPORT_FILES, P.SEARCH_FILES],
    (response) => {
      console.log(response);
      console.log('\n\n');
    }
  );

  readline.close();
});
