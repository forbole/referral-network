import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Contributions } from '/imports/api/contributions/contributions.js';
import List from './List.jsx';

export default ContributionsListContainer = withTracker((props) => {
  const username = (!props.match.params.username)?((Meteor.userId())?Meteor.user().username:''):props.match.params.username;
  const usersHandle = Meteor.subscribe('users.all');
  const user = Meteor.users.findOne({username:username});
  let contribHandle;
  let loading = true;
  if (user){
    contribHandle = Meteor.subscribe('contributions.user', user._id);
    loading = !contribHandle.ready() || !usersHandle.ready();
  }
  // const imagesHandle = Meteor.subscribe('images.all');
  // const recoHandle = Meteor.subscribe('recommendations.all');
  // const inviteHandle = Meteor.subscribe('invites.all');
  // const connections = Connections.find({users: {$in: [user._id]}}).fetch();
  const userExists = !loading && !!user;
  // console.log(userExists);
  return {
    loading,
    userExists,
    user: user,
    contributions: userExists ? Contributions.find({userId: user._id}, {createdAt:-1}).fetch() : {}
  };
})(List);
