import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
// import { Images } from '../images/images.js';
// if (Meteor.isServer){
//
// }

Meteor.methods({
  'users.updateProfilePic'(fileId){
    check(fileId, String);

    if (Meteor.user().profile.image_id){
      Images.remove({_id:Meteor.user().profile.image_id});
    }
    Meteor.users.update({_id:Meteor.userId()}, {$set:{"profile.image_id":fileId}});
  }
})
