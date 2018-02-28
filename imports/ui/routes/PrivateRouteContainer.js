import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import PrivateRoute from './PrivateRoute.jsx';

PrivateRoute.propTypes = {
    loggingIn: PropTypes.bool,
    currentUser: PropTypes.object,
};

export default PrivateRouteContainer = withTracker(() => {
  return {
    currentUser : Meteor.user(),
    loggingIn : Meteor.loggingIn()
  };
})(PrivateRoute);
