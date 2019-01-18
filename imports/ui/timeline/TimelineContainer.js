import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Timeline from './Timeline.jsx';
import { Activities } from '../../api/activities/activities.js';
import { Invites } from '../../api/invites/invites.js';
import { Referrals } from '../../api/referrals/referrals.js';
import { Recommendations } from '../../api/recommendations/recommendations.js';

export default TimelineContainer = withTracker((props) => {
    const activitiesHandle = Meteor.subscribe('activities.timeline', 10);
    let loading = !activitiesHandle.ready(); 
    // let connections = 
    let timeline = Activities.find({}).fetch();
    if (timeline.length > 0){
        for (t in timeline){
            let propId = timeline[t].propId;
            const userHandle = Meteor.subscribe('users.findOne',timeline[t].userId);
            loading = loading && !userHandle.ready();
            timeline[t].user = Meteor.users.findOne({_id:timeline[t].userId});
            switch (timeline[t].type){
                case "invite":
                    const invitationHandle = Meteor.subscribe('invites.findOne', propId);
                    loading = loading && !invitationHandle.ready();
                    timeline[t].property = Invites.findOne({_id:propId});
                    break;
                case "referral":
                case "received-referral":
                case "introduction":
                    const referralHandle = Meteor.subscribe('referrals.findOne', propId);
                    loading = loading && !referralHandle.ready();
                    timeline[t].property = Referrals.findOne({_id:propId});
                    break;
                case "recommendation":
                    const recommendationHandle = Meteor.subscribe('recommendations.findOne', propId);
                    loading = loading && !recommendationHandle.ready();
                    timeline[t].property = Recommendations.findOne({_id:propId});
                    break;
            }

        }
        // subscriptionDone = true;
    }
    const timelineExists = !loading && !!timeline;
    // console.log(userExists);
    return {
        loading,
        timelineExists,
        timeline: timelineExists  ? timeline : {}
    };
})(Timeline);
