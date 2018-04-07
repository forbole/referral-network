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
    if (user.profile.image_id){
      return Images.findOne(user.profile.image_id).link();
    }
    else{
      return user.profile.picture;
    }
  }
});
