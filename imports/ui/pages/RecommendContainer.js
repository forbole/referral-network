import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Recommend from './Recommend.jsx';

export default RecommendContainer = withTracker((props) => {
  console.log(props);
  const userHandle = Meteor.subscribe('users.all');
  const loading = !userHandle.ready();

  return {
    loading,
    user: (props.match.params.username && !loading)?Meteor.users.findOne({username: props.match.params.username}):{}
  };
})(Recommend);
