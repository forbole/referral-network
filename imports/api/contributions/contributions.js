import { Mongo } from 'meteor/mongo';
// import { Meteor } from 'meteor/meteor';
import { Recommendations } from '../recommendations/recommendations.js';
import { Invites } from '../invites/invites.js';

// import { InvitationCard } from '../../ui/components/ForboleComponents.jsx';
// import InviteAccept from '../../ui/invites/InviteAccept.jsx';
// // import Recommendation from '../../ui/recommendations/Recommendation.js';

export const Contributions = new Mongo.Collection('contributions');

Contributions.helpers({
    reco(){
        return Recommendations.findOne({_id: this.propId});
    },
    invite(){
        console.log(this.propId);
        return Invites.findOne({_id:this.propId});
    }
})