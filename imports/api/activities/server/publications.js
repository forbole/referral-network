import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Activities } from '../activities.js';

Meteor.publish('activities.user', function (userIds) {
    check(userIds, [String]);
    return Activities.find({ user_id: { $in: userIds}});
});

// Meteor.publish('connections.user', function (userId) {
//     return Connections.find({ users: { $in: [userId] } });
// })
