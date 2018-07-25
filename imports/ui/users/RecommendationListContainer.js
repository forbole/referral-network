import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import RecommendationList from './RecommendationList.jsx'; 
import { Recommendations } from '/imports/api/recommendations/recommendations.js';

export default RecommendationListContainer = withTracker((props) => {
    const imagesHandle = Meteor.subscribe('images.all');
    const userHandle = Meteor.subscribe('users.all');

    const user = Meteor.users.findOne({ username: props.username });

    const recosHandle = Meteor.subscribe('recommendations.all');

    const loading = (!userHandle.ready() || !recosHandle.ready() || !imagesHandle.ready());
    const userExists = !loading && !!user;
    let conditions = { acceptedBy: user._id };
    if (user._id === Meteor.userId()){
        conditions = {"$or":[{ acceptedBy: user._id }, { toUserId: user._id}]};
    }
    return {
        loading,
        userExists,
        user: userExists ? user : {},
        recos: userExists ? Recommendations.find(conditions).fetch(): {},
        recosSent: userExists ? Recommendations.find({ createdBy:user._id}).fetch(): {}
    };
})(RecommendationList);