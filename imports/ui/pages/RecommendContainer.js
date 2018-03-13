import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Recommend from './Recommend.jsx';

export default RecommendContainer = withTracker(() => {
  return {
    currentUser : Meteor.user(),
    loggingIn : Meteor.loggingIn()
  };
})(Recommend);
