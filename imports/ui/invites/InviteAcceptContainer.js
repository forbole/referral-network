import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Invites } from '/imports/api/invites/invites.js';
import InviteAccept from './InviteAccept.jsx';

export default InviteAcceptContainer = withTracker((props) => {
  // console.log(props)
  const inviteHandle = Meteor.subscribe('invites.findOne', props.match.params.id);
  const recoHandle = Meteor.subscribe('recommendations.all');
  const imagesHandle = Meteor.subscribe('images.all');
  const loading = !inviteHandle.ready() && !imagesHandle.ready() && !recoHandle.ready();

  const userHandle = Meteor.subscribe('users.all');
  const loadingUser = !userHandle.ready();
  const invite = Invites.findOne(props.match.params.id);
  const inviteExists = !loading && !loadingUser && !!invite;

  return {
    loading,
    inviteExists,
    invite: inviteExists ? invite: {},
    createdUser: inviteExists? Meteor.users.findOne({_id: invite.createdBy}): {}
  };
})(InviteAccept);
