var fs = require('fs');
var path = require('path');
Liquid = require("liquid-node");
var engine = new Liquid.Engine;
var changeCase = require('change-case');
var mkdirp = require('mkdirp');

var dest = path.resolve('.');
var serverFile = '/imports/startup/server/index.js';

exports.collection = function(name) {
    var src = path.resolve(__dirname, '../templates/collection/.');

    var publicationsFile = '/imports/api/'+name+'/server/publications.js';
    var collectionFile = '/imports/api/' + name + '/' + name + '.js';

    console.error('Adding the ' + name + ' collection');

    var data = {
        collection: {
            pascalName: changeCase.pascalCase(name),
            name: name
        }
    };
    // COLLECTION:
    var collectionSrc = path.join(src, '/imports/api/items/items.js');
    var collectionDest = path.join(dest, collectionFile);
    render(collectionSrc, collectionDest, { collection: collection });

    // PUBLICATIONS:
    // create the publications file
    var publicationSrc = path.join(src, '/imports/api/items/server/publications.js');
    var publicationDest = path.join(dest, publicationsFile);
    render(publicationSrc, publicationDest, data);

    // add the publications server side
    fs.appendFileSync(path.join(dest, serverFile), '\nimport \''+ publicationsFile +'\';');
};

exports.method = function(collectionName, methodName) {
    var src = path.resolve(__dirname, '../templates/collection/.');

    var methodFile = '/imports/api/'+collectionName+'/method.'+methodName+'.js';

    console.error('Adding the ' + methodName + ' method to collection ' + collectionName);

    var data = {
        collection: {
            pascalName: changeCase.pascalCase(collectionName),
            name: collectionName
        },
        method: {
            name: methodName
        }
    };
    
    var methodSrc = path.join(src, '/imports/api/items/method.js');
    var methodDest = path.join(dest, methodFile);
    render(methodSrc, methodDest, data);

    // add the method server side
    fs.appendFileSync(path.join(dest, serverFile), '\nimport \''+ methodFile +'\';');
};

function render(source, destination, data){
    engine
        .parse(fs.readFileSync(source))
        .then(function(template) { return template.render(data); })
        .then(function(result) {
            mkdirp.sync(path.dirname(destination));
            console.log(path.dirname(destination) + ' created');

            fs.writeFileSync(destination, result);
        });
}
