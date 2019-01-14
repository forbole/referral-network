import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Recommendations } from '../recommendations/recommendations.js';
import { Images } from '../images/images.js';

Meteor.users.helpers({
  recoCount() {
    return Recommendations.find({acceptedBy: this._id}).count();
  },
  profilePic(){
    let user = Meteor.users.findOne({_id: this._id});

    if (user && user.profile){
      if (user.profile.image_id){
        if (Images.findOne(user.profile.image_id))
          return Images.findOne(user.profile.image_id).link();
        else {
          return user.profile.picture;
        }
      }
      else{
        return user.profile.picture;
      }  
    }
    else{
      return '/img/faces/default-profile.svg';
    }
  },
  coverPic(){
    let user = Meteor.users.findOne({_id: this._id});
    if (user && user.profile){
      if (user.profile.cover_image_id){
        if (Images.findOne(user.profile.cover_image_id))
          return Images.findOne(user.profile.cover_image_id).link();
        else{
          return '/img/kwun-profile-header.jpg';
        }
      }
      else{
        return '/img/kwun-profile-header.jpg';
      }
    }
    else{
      return '/img/kwun-profile-header.jpg';
    }
  }
});
