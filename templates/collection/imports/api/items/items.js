import { Meteor } from 'meteor/meteor';

let {{ collection.pascalName }} = new Meteor.Collection('{{ collection.name }}');

{{ collection.pascalName }}.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; }
});

export default {{ collection.pascalName }};