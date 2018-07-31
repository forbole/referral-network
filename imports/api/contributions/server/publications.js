import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Contributions } from '../contributions.js';

Meteor.publish('contributions.all', function () {
    return Contributions.find();
});