import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Recommendations } from '../recommendations/recommendations.js';

Meteor.users.helpers({
  recoCount() {
    return Recommendations.find({acceptedBy: this._id}).count();
  }
});
