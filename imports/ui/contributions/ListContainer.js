import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Contributions } from '/imports/api/contributions/contributions.js';
import List from './List.jsx';

export default ContributionsListContainer = withTracker((props) => {
  const username = (!props.match.params.username)?((Meteor.userId())?Meteor.user().username:''):props.match.params.username;
  const usersHandle = Meteor.subscribe('users.all');
  const user = Meteor.users.findOne({username:username});
  const contributionsHandle = Meteor.subscribe('contributions.all');
  // const imagesHandle = Meteor.subscribe('images.all');
  // const recoHandle = Meteor.subscribe('recommendations.all');
  const loading = !contributionsHandle.ready() || !usersHandle.ready();
  // const connections = Connections.find({users: {$in: [user._id]}}).fetch();
  const userExists = !loading && !!user;
  // console.log(userExists);
  return {
    loading,
    userExists,
    user: user,
    contributions: userExists ? Contributions.find({userId: user._id}).fetch() : {}
  };
})(List);
