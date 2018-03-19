import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.publish("users.all", function () {
  return Meteor.users.find({}, {fields: {_id: 1, username: 1, emails: 1, profile: 1, skills: 1}});
});

Meteor.publish("users.findByUsername", function (username) {
  return Meteor.users.find({username: username}, {fields: {_id: 1, username: 1, emails: 1, profile: 1, skills: 1}});
});
