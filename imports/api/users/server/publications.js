import { Meteor } from 'meteor/meteor';
import { publishComposite } from 'meteor/reywood:publish-composite';
import { check } from 'meteor/check';
import { Images } from '../../images/server/store.js';

Meteor.publish("users.all", function () {
  return Meteor.users.find({}, {fields: {_id: 1, username: 1, emails: 1, profile: 1, skills: 1, scores: 1}});
});

// console.log(Images);

// Meteor.publish("users.findByUsername", function (username) {
//   check(username, String);
//   return Meteor.users.find({ username: username }, { fields: { _id: 1, username: 1, emails: 1, profile: 1, skills: 1, scores: 1}});
// });

// Meteor.publish("users.findById", function(userId){
//   check(userId, String);
//   return Meteor.users.find({_id:userId}, {fields:{ _id: 1, username: 1, emails: 1, profile: 1, skills: 1, scores: 1}})
// });

publishComposite('users.findByUsername', function(username) {
  check(username, String);
  return {
      find() {
          // Find posts made by user. Note arguments for callback function
          // being used in query.
          return Meteor.users.find({ username: username }, { fields: { _id: 1, username: 1, emails: 1, profile: 1, skills: 1, scores: 1}});
      },
      children: [
        {
            find(user) {
                return Images.find(
                    { _id: user.profile.image_id },
                    { limit: 1 }
                ).cursor;
            }
        }
    ]
  }
});

publishComposite('users.findOne', function(userId) {
    check(userId, String);
    return {
        find() {
            // Find posts made by user. Note arguments for callback function
            // being used in query.
            return Meteor.users.find({ _id: userId }, { fields: { _id: 1, username: 1, emails: 1, profile: 1, skills: 1, scores: 1}});
        },
        children: [
          {
              find(user) {
                  return Images.find(
                      { _id: user.profile.image_id },
                      { limit: 1 }
                  ).cursor;
              }
          }
      ]
    }
  });