import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Invites } from '../invites.js';

Meteor.publish('invites.all', function () {
  return Invites.find();
});

Meteor.publish('invites.findOne', function (invitationId) {
  check(invitationId, String);
  return Invites.find({_id: invitationId});
});
