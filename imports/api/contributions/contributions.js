import { Mongo } from 'meteor/mongo';
import { Recommendations } from '../recommendations/recommendations.js';
import { Invites } from '../invites/invites.js';
import { Connections } from '../connections/connections.js';
import { Referrals } from '../referrals/referrals.js';

export const Contributions = new Mongo.Collection('contributions');

Contributions.helpers({
    reco(){
        return Recommendations.findOne({_id: this.propId});
    },
    invite(){
        return Invites.findOne({_id:this.propId});
    },
    referral(){
        return Referrals.findOne({_id:this.propId});
    },
    connection(){
        // console.log(this);
        let conn = Connections.findOne({_id:this.propId});
        conn.userId = this.userId;
        return conn;
    }
})