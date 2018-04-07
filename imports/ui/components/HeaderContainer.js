import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Images } from '/imports/api/images/images.js';
import Header from './Header.jsx';

Header.propTypes = {
    loggingIn: PropTypes.bool,
    currentUser: PropTypes.object,
    transHead: PropTypes.bool
};

export default HeaderContainer = withTracker((props) => {
  let imagesHandle = Meteor.subscribe('images.all');
  let loading = !imagesHandle.ready();

  return {
    loading: loading,
    currentUser : Meteor.user(),
    loggingIn : Meteor.loggingIn(),
    transHead : props.transHead
  };
})(Header);
