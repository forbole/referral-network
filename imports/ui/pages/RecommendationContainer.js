import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Recommendations } from '/imports/api/recommendations/recommendations.js';
import Recommendation from './Recommendation.jsx';

export default RecommendationContainer = withTracker((props) => {
  // console.log(props)
  const recoHandle = Meteor.subscribe('recommendations.findOne', props.match.params.id);
  // const referrer = Meteor.users.findOne()
  const loading = !recoHandle.ready();
  const reco = Recommendations.findOne(props.match.params.id);
  const recoExists = !loading && !!reco;

  // console.log(reco);
  // console.log(Meteor.users.findOne({_id: "ZHJbGgzLrgrmmfxeN"}));

  return {
    loading,
    recoExists,
    reco: recoExists ? reco: {},
    createdUser: recoExists? Meteor.users.findOne({_id: reco.createdBy}): {}
  };
})(Recommendation);
