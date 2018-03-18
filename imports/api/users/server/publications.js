import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.publish("users.all", function () {
  return Meteor.users.find({}, {fields: {_id: 1, username: 1, emails: 1, profile: 1}});
});
