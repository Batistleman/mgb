var fs = require('fs');
var path = require('path');

var dest = path.resolve('.');

exports.default = function() {
    // check for basic folders:
    console.log('Analysing your folder structure.');
    checkPath('/test', 'It should contain some tests');
    checkPath('/client', "It's the client entrypoint of your application");
    checkPath('/server', "It's the server entrypoint of your application");
    checkPath('/imports', "Since Meteor 1.3 this folder should be present.");
    checkPath('/imports/api', "This should contain all your collections.");
    checkPath('/imports/startup', "This should contain the files you only run once at startup.");
    checkPath('/imports/startup/client', "This should contain the files you only run once at startup, on the client.");
    checkPath('/imports/startup/server', "This should contain the files you only run once at startup, on the server.");
    checkPath('/imports/ui', "This should contain all your UI files.");

    // check file presence
    checkPath('/server/main.js', "This should be the server entrypoint.");
    checkPath('/client/main.js', "This should be the client entrypoint.");
    checkPath('/imports/startup/client/index.js', "This should contain the client things your run on startup.");
    checkPath('/imports/startup/server/index.js', "This should contain the server things your run on startup. Like the publications and methods.");
};

function checkPath(folder, reason){
    var destination = path.join(dest, folder);
    fs.access(destination, fs.F_OK, function(err) {
        if (!err) {
        } else {
            console.error("We didn't find '"+folder+"' please consider adding. " + reason);
        }
    });
}