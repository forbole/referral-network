import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Profile from './Profile.jsx';
import { Connections } from '/imports/api/connections/connections.js';
// import { Recommendations } from '/imports/api/recommendations/recommendations.js';


export default ProfileContainer = withTracker((props) => {
  const imagesHandle = Meteor.subscribe('images.all');
  const username = (!props.match.params.username)?((Meteor.userId())?Meteor.user().username:''):props.match.params.username;
  const userHandle = Meteor.subscribe('users.findByUsername', username);
  const user = Meteor.users.findOne({username: username});
  const connectionHandle = Meteor.subscribe('connections.all');

  // const recosHandle = Meteor.subscribe('recommendations.all');

  const loading = (!userHandle.ready() || !imagesHandle.ready() || !connectionHandle.ready());
  const userExists = !loading && !!user;
  return {
    loading,
    userExists,
    user: userExists ? user: {},
    connectionCounts: userExists ? Connections.find({users: {$in: [user._id]}}).count() : {}
    // recos: userExists ? Recommendations.find({acceptedBy:user._id}).fetch(): {},
    // recosSent: userExists ? Recommendations.find({ createdBy:user._id}).fetch(): {}
  };
})(Profile);
