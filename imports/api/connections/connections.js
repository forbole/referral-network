import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Connections = new Mongo.Collection('connections');

Connections.helpers({
  user(thisUserId){
    return Meteor.users.findOne({_id: {$nin: [thisUserId]}});
  }
});
