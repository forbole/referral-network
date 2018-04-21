import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Contributions } from './contributions.js';
import moment from 'moment';

Meteor.methods({
  'contributions.insert'(type, propId, userId, score){
    check(type, String);
    check(propId, String);
    check(userId, String);
    check(score, Match.Integer);

    return Contributions.insert({
      type: type,
      propId: propId,
      userId: userId,
      score: score,
      createdAt: new Date()
    });
  }
});
