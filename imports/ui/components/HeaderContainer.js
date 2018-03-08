import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Header from './Header.jsx';

Header.propTypes = {
    loggingIn: PropTypes.bool,
    currentUser: PropTypes.object,
    transHead: PropTypes.bool
};

export default HeaderContainer = withTracker((props) => {
  return {
    currentUser : Meteor.user(),
    loggingIn : Meteor.loggingIn(),
    transHead : props.transHead
  };
})(Header);
