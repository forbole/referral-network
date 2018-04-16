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
    return Meteor.users.update({_id:Meteor.userId()}, {$set:{"profile.image_id":fileId}});
  },
  'users.udpateProfile'(firstname, lastname, headline, position, location){
    check(firstname, String);
    check(lastname, String);
    check(headline, String);
    check(position, String);
    check(location, String);

    if (Meteor.userId() == this.userId){
      return Meteor.users.update({_id:this.userId}, {$set:{
        "profile.firstname": firstname,
        "profile.lastname": lastname,
        "profile.name": firstname+" "+lastname,
        "profile.headline": headline,
        "profile.position": position,
        "profile.location": location
      }});
    }
    else{
      throw new Meteor.Error('not-authorized', "You are not authorized to do this.");
    }
  }
})
