import { Mongo } from 'meteor/mongo';

export const Recommendations = new Mongo.Collection('recommendations');

Recommendations.helpers({
  creator() {
    return Meteor.users.findOne(this.createdBy);
  },
  acceptor(){
    return Meteor.users.findOne(this.acceptedBy);
  }
});
