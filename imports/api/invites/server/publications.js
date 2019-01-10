import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Invites } from '../invites.js';
import { Images } from '../../images/server/store.js';

publishComposite('invites.findOne', function(invitationId) {
  check(invitationId, String);
  return {
      find() {
          return Invites.find({ _id: invitationId });
      },
      children: [
        {
          find(invite) {
                return Meteor.users.find(
                  { _id: {$in: [invite.createdBy, invite.acceptedBy] }},
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