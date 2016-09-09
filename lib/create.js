var fs = require('fs');
var path = require('path');

exports.default = function() {
    var src = path.resolve(__dirname, '../templates/bootstrap/.');
    var dest = path.resolve('.');

    console.error('Creating a new project');
    console.error('  destination path:' + dest);

    // TODO: check if the destination folder is empty

    copyFolderRecursiveSync(src, dest);
};

function copyFileSync( source, target ) {

    var targetFile = target;

    //if target is a directory a new file with the same name will be created
    if ( fs.existsSync( target ) ) {
        if ( fs.lstatSync( target ).isDirectory() ) {
            targetFile = path.join( target, path.basename( source ) );
        }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync( source, target, createFolder ) {
    var files = [];

    //check if folder needs to be created or integrated
    var targetFolder = createFolder ? path.join( target, path.basename( source ) ) : target;
    if ( !fs.existsSync( targetFolder ) ) {
        fs.mkdirSync( targetFolder );
    }

    //copy
    if ( fs.lstatSync( source ).isDirectory() ) {
        files = fs.readdirSync( source );
        files.forEach( function ( file ) {
            var curSource = path.join( source, file );
            if ( fs.lstatSync( curSource ).isDirectory() ) {
                copyFolderRecursiveSync( curSource, targetFolder,true );
            } else {
                copyFileSync( curSource, targetFolder );
            }
        } );
    }
}