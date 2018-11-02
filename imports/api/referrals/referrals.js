import { Mongo } from 'meteor/mongo';

export const Referrals = new Mongo.Collection('referrals');

// Referrals.helpers({
// //   creator() {
// //     return Meteor.users.findOne(this.createdBy);
// //   },
// //   acceptor(){
// //     return Meteor.users.findOne(this.acceptedBy);
// //   }
// });
