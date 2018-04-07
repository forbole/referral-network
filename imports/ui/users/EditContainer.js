import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import ProfileEdit from './Edit.jsx';
import { Images } from '/imports/api/images/images.js';


export default ProfileEditContainer = withTracker((props) => {
  const imagesHandle = Meteor.subscribe('images.all');
  const loading = !imagesHandle.ready();
  return {
    loading,
  };
})(ProfileEdit);
