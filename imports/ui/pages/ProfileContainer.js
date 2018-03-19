import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Accounts } from 'meteor/accounts-base'
// import { P } from '/imports/api/recommendations/recommendations.js';
import Profile from './Profile.jsx';

export default ProfileContainer = withTracker((props) => {
  // console.log(props)
  let username = (!props.match.params.username)?Meteor.user().username:props.match.params.username;
  // console.log("right after username assignment: "+username);
  // if (typeof props.match.params.username != undefined){
  //   username = props.match.params.username;
  // }
  // else {
  //   username = Meteor.user().username;
  //   console.log(username);
  // }
  // else username = Meteor.user().username;
  const userHandle = Meteor.subscribe('users.findByUsername', username);
  const loading = !userHandle.ready();
  const user = Meteor.users.findOne({username: username});
  // console.log(user);
  const userExists = !loading && !!user;

  return {
    loading,
    userExists,
    user: userExists ? user: {},
    // createdUser: recoExists? Meteor.users.findOne({_id: reco.createdBy}): {}
  };
})(Profile);
