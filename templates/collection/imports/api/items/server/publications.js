import { Meteor } from 'meteor/meteor';
import {{ collection.pascalName }} from '../{{ collection.name }}.js';

Meteor.publish('{{ collection.name }}', function(){

    // TODO: This is some basic security, you should probably check this
    if (!this.userId) {
        console.log('Publication not allowed');
        return this.ready();
    }

    return {{ collection.pascalName }}.find();
});