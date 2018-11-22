import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Recommendations } from '/imports/api/recommendations/recommendations.js';
import Recommendation from './Recommendation.jsx';

export default RecommendationContainer = withTracker((props) => {
  // console.log(props)
  const recoHandle = Meteor.subscribe('recommendations.findOne', props.match.params.id);
  // const imagesHandle = Meteor.subscribe('images.all');
  // const referrer = Meteor.users.findOne()
  const loading = !recoHandle.ready();//  && !imagesHandle.ready();

  const userHandle = Meteor.subscribe('users.all');
  const loadingUser = !userHandle.ready();
  const reco = Recommendations.findOne(props.match.params.id);
  const recoExists = !loading && !loadingUser && !!reco;

  // console.log(reco);
  // console.log(Meteor.users.findOne({_id: "ZHJbGgzLrgrmmfxeN"}));

  return {
    loading,
    recoExists,
    reco: recoExists ? reco: {},
    createdUser: recoExists? Meteor.users.findOne({_id: reco.createdBy}): {}
  };
})(Recommendation);
