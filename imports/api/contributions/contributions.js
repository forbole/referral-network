import { Mongo } from 'meteor/mongo';
// import { Meteor } from 'meteor/meteor';
import { Recommendations } from '../recommendations/recommendations.js';
// import Recommendation from '../../ui/recommendations/Recommendation.js';

export const Contributions = new Mongo.Collection('contributions');

Contributions.helpers({
    reco(){
        return Recommendations.findOne({_id: this.propId});
    }
})