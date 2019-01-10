import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Connections } from '../connections.js';
import { Images } from '../../images/server/store.js';

Meteor.publish('connections.all', function () {
  return Connections.find();
});

// Meteor.publish('connections.user', function (userId) {
//   return Connections.find({
//     users: {
//       $in: [userId]
//     }
//   });
// })

publishComposite('connections.user', function(userId) {
  check(userId, String);
  return {
      find() {
          return Connections.find({
            users: {
              $in: [userId]
            }
          });
      },
      children: [
        {
          find(connection) {
                return Meteor.users.find(
                  { _id: {$in: connection.users }},
                  { fields: { username: 1, profile: 1 } });
          },
          children:[
            {
              find(user, invite){
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