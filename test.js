var fs = require('fs');
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
    // var A = C.TAG_ACTIONS;



    C.get_file_metadata({
        file_ids: [9094346]
    }, (response) => {
        console.log(response);
        console.log('\n\n');
    })

    readline.close();
});