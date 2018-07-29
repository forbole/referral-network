import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Connections } from '/imports/api/connections/connections.js';
import List from './List.jsx';

export default ConnectionsListContainer = withTracker((props) => {
  const username = (!props.match.params.username)?((Meteor.userId())?Meteor.user().username:''):props.match.params.username;
  const usersHandle = Meteor.subscribe('users.all');
  const user = Meteor.users.findOne({username:username});
  const connectionsHandle = Meteor.subscribe('connections.all');
  const imagesHandle = Meteor.subscribe('images.all');
  const recoHandle = Meteor.subscribe('recommendations.all');
  const loading = !connectionsHandle.ready() || !usersHandle.ready() || !recoHandle.ready() || !imagesHandle.ready();
  // const connections = Connections.find({users: {$in: [user._id]}}).fetch();
  const userExists = !loading && !!user;
  // console.log(userExists);
  return {
    loading,
    userExists,
    user: user,
    connections: userExists ? Connections.find({users: {$in: [user._id]}}).fetch() : {}
  };
})(List);
