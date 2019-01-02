import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Timeline from './Timeline.jsx';
import { Activities } from '../../api/activities/activities.js';

export default TimelineContainer = withTracker((props) => {
    const activitiesHandle = Meteor.subscribe('activities.timeline', 10);
    const loading = !activitiesHandle.ready(); 
    // let connections = 
    const timeline = Activities.find({}).fetch();
    const timelineExists = !loading && !!timeline;
    // console.log(userExists);
    return {
        loading,
        timelineExists,
        timeline: timelineExists ? timeline : {}
    };
})(Timeline);
