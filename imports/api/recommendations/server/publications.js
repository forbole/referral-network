import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Recommendations } from '../recommendations.js';
import { Images } from '../../images/server/store.js';

Meteor.publish('recommendations.all', function () {
  return Recommendations.find();
});

// Meteor.publish('recommendations.findOne', function (recommendationId) {
//   check(recommendationId, String);
//   return Recommendations.find({_id: recommendationId});
// });


publishComposite('recommendations.findOne', function(recommendationId, accepted = false) {
  check(recommendationId, String);
  return {
      find() {
          return Recommendations.find({ _id: recommendationId, accepted: accepted }, {fields:{upvotes:0, downvotes:0}});
      },
      children: [
        {
          find(reco) {
                return Meteor.users.find(
                  { _id: {$in: [reco.createdBy, reco.acceptedBy] }},
                  { fields: { username: 1, profile: 1 } });
          },
          children:[
            {
              find(user, reco){
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