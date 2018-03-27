import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Connections } from '../connections.js';

Meteor.publish('connections.all', function () {
  return Connections.find();
});
