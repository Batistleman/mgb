import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
let {{ collection.pascalName }} = new Meteor.Collection('{{ collection.name }}');

let {{ method.name }} = {
    name: '{{ collection.name }}.{{ method.name }}',

    validate(args) {
        // TODO: add some checks
    },

    run(args) {
        // TODO: add your method logic
        // probably {{ collection.pascalName }}.update({}) or something
    },

    call(args, callback) {
        Meteor.apply(this.name, [args], {returnStubValue: true, throwStubExceptions: true}, callback);
    }
};

export default {{ method.name }};

Meteor.methods({
    [{{ method.name }}.name]: function (args) {
        {{ method.name }}.validate.call(this, args);
        {{ method.name }}.run.call(this, args);
    }
});