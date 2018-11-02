import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Refer from './Refer.jsx';

export default ReferContainer = withTracker((props) => {
  const userHandle = Meteor.subscribe('users.findByUsername', props.match.params.username);
//   const imagesHandle = Meteor.subscribe('images.all');
  const loading = !userHandle.ready();
  const user = Meteor.users.findOne({username: props.match.params.username});
  const userExists = !loading && !!user;
  return {
    loading,
    userExists,
    user: userExists ? user : {}
  };
})(Refer);
