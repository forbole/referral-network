import { Mongo } from 'meteor/mongo';

export const Referrals = new Mongo.Collection('referrals');

Referrals.helpers({
  creator() {
    return Meteor.users.findOne(this.createdBy);
  },
  acceptor(){
    if (this.acceptUserId)
      return Meteor.users.findOne(this.acceptUserId);
    else {
      return this.name;
    }
  },
  referee(){
    return Meteor.users.findOne(this.refereeId);
  }
});
