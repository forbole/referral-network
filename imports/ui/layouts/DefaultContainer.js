import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import DefaultLayout from './Default.jsx';

DefaultLayout.propTypes = {
    loggingIn: PropTypes.bool,
    currentUser: PropTypes.object,
};

export default DefaultContainer = withTracker(() => {
  return {
    currentUser : Meteor.user(),
    loggingIn : Meteor.loggingIn()
  };
})(DefaultLayout);
