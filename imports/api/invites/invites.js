import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Recommendations } from '../recommendations/recommendations.js';

export const Invites = new Mongo.Collection('invites');

Invites.helpers({
  recommendation() {
    return Recommendations.findOne(this.recoId);
  },
  acceptor(){
    return Meteor.users.findOne(this.acceptedBy);
  }
});
