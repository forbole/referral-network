import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Activities } from '../activities.js';

Meteor.methods({
  'activities.insert'(userId, type, propId){
    check(userId, String);
    check(type, String);
    check(propId, String);

    try {
        // Mongodb insert or update
        return Activities.insert({
            userId: userId,
            type: type,
            propId: propId,
            createdAt: new Date()
        });
    } catch(e) {
        if (e instanceof WriteError && e.code === '11000') {
            throw new Meteor.Error("duplicate-error", "The activity already exists.");
        }
    }
  }
});
