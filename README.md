# Meteor Guide Builder

> WARNING: this is a POC for the moment
> based on: https://github.com/dburles/meteor-guide-starter-react

Meteor Guide Builder - a tool to setup a Meteor project, add collections, add pages and more.
All according to the Meteor Guide (https://guide.meteor.com/)


## Why?

Because we all benefit from having comparable code bases. If the community chooses to go a direction, changes should be easier.

## Usage

    git clone https://github.com/batistleman/mgb.git`
    npm link

    mgb
        create                                     - Initialize a basic Meteor project
        analyse                                    - Analyse the code structure of your application
        
        Some info on what you can add:
        add collection [name]                      - Add a collection, name has to be lowercase plural, like: tasks, items, ...
        add method [collectionName] [methodName]   - Add a method to a collectio

## Examples:

### Create:

    mgb create

This will create a new meteor application for you with some basic scaffolding. (Structure is taken from: https://github.com/dburles/meteor-guide-starter-react)

### Analyse:

    mgb analyse
    
The goal of this command is to give you some feedback on your file structure. Like what folder should be present, what file should your project include.


### Adding things 

#### A Collection

    mgb add collection tasks
    
This command will generate the required files and place them in the correct folders. 

#### A Method 

    mgb add method tasks complete
    
This command will generate the required files - where you can implement your logic. And add them to the server/index.js file.

## License

MIT