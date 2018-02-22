import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Header from './Header.jsx';

Header.propTypes = {
    loggingIn: PropTypes.bool,
    currentUser: PropTypes.object,
};

export default HeaderContainer = withTracker(() => {
  return {
    currentUser : Meteor.user(),
    loggingIn : Meteor.loggingIn()
  };
})(Header);
