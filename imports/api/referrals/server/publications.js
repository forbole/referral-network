import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Referrals } from '../referrals.js';
import { Images } from '../../images/server/store.js';

Meteor.publish('referrals.all', function () {
  return Referrals.find();
});

// Meteor.publish('referrals.findOne', function (referralId) {
//   check(referralId, String);
//   return Referrals.find({_id: referralId});
// });

publishComposite('referrals.findOne', function(referralId) {
  check(referralId, String);
  return {
      find() {
          // Find posts made by user. Note arguments for callback function
          // being used in query.
          return Referrals.find({ _id: referralId });
      },
      children: [
        {
          find(referral) {
              // Find post author. Even though we only want to return
              // one record here, we use "find" instead of "findOne"
              // since this function should return a cursor.
              return Meteor.users.find(
                  { _id: {$in: [referral.createdBy, referral.refereeId] }},
                  { fields: { username: 1, profile: 1 } });
          },
          children:[
            {
              find(user, referral){
                return Images.find(
                  { _id: user.profile.image_id },
                  { limit: 1 }
                ).cursor;
              }
            }
          ]
        }
    ]
  }
});

Meteor.publish('referrals.referred', function(userId){
    check(userId, String);
    return Referrals.find({referredBy:userId});
});

Meteor.publish('referrals.received', function(userId){
    check(userId, String);
    return Referrals.find({receivedBy:userId});
});