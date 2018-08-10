import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import ActivitiesStream from './Activities.jsx';
import { Connections } from '../../api/connections/connections.js';
import { Activities } from '/imports/api/activities/activities.js';

export default ActivitiesContainer = withTracker((props) => {
    const userHandle = Meteor.subscribe('users.all');
    // const activitiesHandle = Meteor.subscribe('activities.user', Meteor.userId());
    const connectionsHandle = Meteor.subscribe('connections.user', Meteor.userId());
    const loadingConn = !userHandle.ready() || !connectionsHandle.ready();
    if (!loadingConn){
        const connections = Connections.find({}).fetch();
        // console.log(connections);
        let connUserIds = [];
        connections.map((connection, i) => {
            // console.log(connection);
            connection.users.map((userId, j) => {
                if (userId !== Meteor.userId()){
                    connUserIds.push(userId);
                }
            })
        });

        // const stream = Activities.find({});
        activitiesHandle = Meteor.subscribe('activities.user', connUserIds);
    }

    const loading = loadingConn || !activitiesHandle.ready();
    
    // const user = Meteor.users.findOne({ username: props.match.params.username });
    // const userExists = !loading && !!user;
    return {
        loading,
        // userExists,
        // user: userExists ? Meteor.users.findOne({ username: props.match.params.username }) : {}
        activities: !loading ? Activities.find({}).fetch(): {}
    };
})(ActivitiesStream);
