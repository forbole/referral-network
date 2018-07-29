import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Skills from './Skills.jsx'; 

export default SkillsContainer = withTracker((props) => {
    const userHandle = Meteor.subscribe('users.findByUsername', props.username);
    const user = Meteor.users.findOne({ username: props.username });

    const loading = !userHandle.ready();
    const userExists = !loading && !!user;

    return {
        loading,
        userExists,
        user: userExists ? user : {},
    };
})(Skills);