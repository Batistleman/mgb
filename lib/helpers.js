exports.printHelp = function() {
    console.error('\nValid Actions');
    console.error('-------------');
    console.error('create                                     - Initialize a basic Meteor project');
    console.error('analyze                                    - Analyze the code structure of your application');

    exports.printHelpAdd();
};


exports.printHelpAdd = function() {
    console.error('\nSome info on what you can add:');
    console.error('add collection [name]                      - Add a collection, name has to be lowercase plural, like: tasks, items, ...');
    console.error('add method [collectionName] [methodName]   - Add a method to a collection');
};
