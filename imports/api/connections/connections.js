import { Mongo } from 'meteor/mongo';

export const Connections = new Mongo.Collection('connections');

Connections.helpers({
  users(){
    return Meteor.users.find({_id: {$in: this.users}});
  }
});
