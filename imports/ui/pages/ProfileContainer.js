import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Accounts } from 'meteor/accounts-base'
// import { P } from '/imports/api/recommendations/recommendations.js';
import Profile from './Profile.jsx';
import { Recommendations } from '/imports/api/recommendations/recommendations.js';


export default ProfileContainer = withTracker((props) => {
  // console.log(props)
  const userHandle = Meteor.subscribe('users.all');

  // let user;
  // console.log(Meteor.userId());

  // if (typeof props.match.params.username != undefined){
  //   user = Meteor.users.findOne({username: props.match.params.username});
  // }else if (Meteor.userId()){
  //   user = Meteor.users.findOne({_id:Meteor.userId()});
  //   console.log(user);
  // }
  // console.log(username);
  const username = (!props.match.params.username)?((Meteor.userId())?Meteor.user().username:''):props.match.params.username;
  const user = Meteor.users.findOne({username: username});
  // const userHandle = Meteor.subscribe('users.findByUsername', username);

  const recosHandle = Meteor.subscribe('recommendations.all');

  // const recos = Recommendations.find({acceptedBy:user._id}).fetch();
  const loading = (!userHandle.ready() || !recosHandle.ready());
  const userExists = !loading && !!user;
  // const recosExists = !loading && !!recos;
  return {
    loading,
    userExists,
    user: userExists ? user: {},
    recos: userExists ? Recommendations.find({acceptedBy:user._id}).fetch(): {}
    // createdUser: recoExists? Meteor.users.findOne({_id: reco.createdBy}): {}
  };
})(Profile);
