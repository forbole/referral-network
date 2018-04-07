import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Connections } from '/imports/api/connections/connections.js';
import { Images } from '/imports/api/images/images.js';
import List from './List.jsx';

export default ConnectionsListContainer = withTracker((props) => {
  const connectionsHandle = Meteor.subscribe('connections.user', Meteor.userId());
  const usersHandle = Meteor.subscribe('users.all');
  const imagesHandle = Meteor.subscribe('images.all');
  const recoHandle = Meteor.subscribe('recommendations.all');
  const loading = !connectionsHandle.ready() || !usersHandle.ready() || !recoHandle.ready() || !imagesHandle.ready();
  const connections = Connections.find({users: {$in: [Meteor.userId()]}}).fetch();
  const connectionsExists = !loading && !!connections;
  // console.log(userExists);
  return {
    loading,
    connectionsExists,
    connections: connectionsExists ? connections : {}
  };
})(List);
