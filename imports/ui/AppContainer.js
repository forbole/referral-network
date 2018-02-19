import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import App from './App.jsx';

App.propTypes = {
    loggingIn: PropTypes.bool,
    currentUser: PropTypes.object,
};

export default AppContainer = withTracker(() => {
  return {
    currentUser : Meteor.user(),
    loggingIn : Meteor.loggingIn()
  };
})(App);
