import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Recommendations } from '../recommendations.js';

Meteor.publish('recommendations.all', function () {
  return Recommendations.find();
});

Meteor.publish('recommendations.findOne', function (recommendationId) {
  check(recommendationId, String);
  return Recommendations.find({_id: recommendationId});
});
