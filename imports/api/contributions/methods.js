import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Contributions } from './contributions.js';
// import moment from 'moment';

Meteor.methods({
  'contributions.insert'(type, propId, userId, score){
    console.log("contributions insert");
    check(type, String);
    check(propId, String);
    check(userId, String);
    check(score, Number);

    let user = Meteor.users.findOne({_id:userId});
    let curScores = user.scores;
    if (!curScores) curScores = 0;
    if (Contributions.insert({
      type: type,
      propId: propId,
      userId: userId,
      score: score,
      createdAt: new Date()
    })){
      return Meteor.users.update({ _id: userId }, { $set: { scores: curScores+score}});
    }
  }
});
