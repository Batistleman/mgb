var fs = require('fs');
var path = require('path');
Liquid = require("liquid-node");
var engine = new Liquid.Engine;
var changeCase = require('change-case');
var mkdirp = require('mkdirp');

var dest = path.resolve('.');
var src = path.resolve(__dirname);

var serverFile = '/imports/startup/server/index.js';

exports.collection = function(name) {
    console.log('Adding the ' + name + ' collection');

    var data = {
        collection: {
            pascalName: changeCase.pascalCase(name),
            name: name
        }
    };

    console.log('Adding the collection file');
    render('../templates/collection/imports/api/items/items.js', '/imports/api/' + name + '/' + name + '.js', data);

    console.log('Adding the publications file');
    var publicationsFile = '/imports/api/'+name+'/server/publications.js';
    render('../templates/collection/imports/api/items/server/publications.js', publicationsFile, data);

    console.log('Adding the publications server side');
    fs.appendFileSync(path.join(dest, serverFile), '\nimport \''+ publicationsFile +'\';');
};

exports.method = function(collectionName, methodName) {
    console.log('Adding the ' + methodName + ' method to collection ' + collectionName);

    var data = {
        collection: {
            pascalName: changeCase.pascalCase(collectionName),
            name: collectionName
        },
        method: {
            name: methodName
        }
    };

    console.log('Adding the method file');
    var methodFile = '/imports/api/'+collectionName+'/method.'+methodName+'.js';
    render('../templates/collection/imports/api/items/method.js', methodFile, data);

    console.log('Adding the method server side');
    fs.appendFileSync(path.join(dest, serverFile), '\nimport \''+ methodFile +'\';');
};

function render(srcFile, destFile, data){
    var source = path.join(src, srcFile);
    var destination = path.join(dest, destFile);

    console.log('    ... rendering the ' + destFile + ' file.');

    engine
        .parse(fs.readFileSync(source))
        .then(function(template) { return template.render(data); })
        .then(function(result) {
            mkdirp.sync(path.dirname(destination));
            fs.writeFileSync(destination, result);
        });
}
