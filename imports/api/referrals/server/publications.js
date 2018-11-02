import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Referrals } from '../referrals.js';

Meteor.publish('referrals.all', function () {
  return Referrals.find();
});

Meteor.publish('referrals.findOne', function (referralId) {
  check(referralId, String);
  return Referrals.find({_id: referralId});
});

Meteor.publish('referrals.referred', function(userId){
    check(userId, String);
    return Referrals.find({referredBy:userId});
});

Meteor.publish('referrals.received', function(userId){
    check(userId, String);
    return Referrals.find({receivedBy:userId});
});