import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import HelloWorld from '/imports/ui/components/HelloWorld';
import './routes';

Meteor.startup(() => {
  render(<HelloWorld />, document.getElementById('app'));
});
