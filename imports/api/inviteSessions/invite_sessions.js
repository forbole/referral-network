import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Invites } from '../invites/invites.js';
import { Referrals } from '../referrals/referrals.js';

export const InviteSession = new Mongo.Collection('invite_sessions');

InviteSession.helpers({
    invite(){
        switch (this.inviteType){
            case 'invite':
                return Invites.findOne({_id: this.inviteId});
            case 'referral':
                return Referrals.findOne({_id: this.inviteId});
        }
        
    }
})