import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Images } from '/imports/api/images/images.js';
import Recommend from './Recommend.jsx';

export default RecommendContainer = withTracker((props) => {
  const userHandle = Meteor.subscribe('users.all');
  const imagesHandle = Meteor.subscribe('images.all');
  const loading = !userHandle.ready() || !imagesHandle.ready();
  const user = Meteor.users.findOne({username: props.match.params.username});
  const userExists = !loading && !!user;
  console.log(userExists);
  return {
    loading,
    userExists,
    user: userExists ? Meteor.users.findOne({username: props.match.params.username}) : {}
  };
})(Recommend);
