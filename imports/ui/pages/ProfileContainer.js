import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Accounts } from 'meteor/accounts-base'
import Profile from './Profile.jsx';
import { Recommendations } from '/imports/api/recommendations/recommendations.js';


export default ProfileContainer = withTracker((props) => {
  const userHandle = Meteor.subscribe('users.all');

  const username = (!props.match.params.username)?((Meteor.userId())?Meteor.user().username:''):props.match.params.username;
  const user = Meteor.users.findOne({username: username});

  const recosHandle = Meteor.subscribe('recommendations.all');

  const loading = (!userHandle.ready() || !recosHandle.ready());
  const userExists = !loading && !!user;
  return {
    loading,
    userExists,
    user: userExists ? user: {},
    recos: userExists ? Recommendations.find({acceptedBy:user._id}).fetch(): {}
  };
})(Profile);
