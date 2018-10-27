import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Invites } from '../invites/invites.js';

export const InviteSession = new Mongo.Collection('invite_sessions');

InviteSession.helpers({
    invite(){
        return Invites.findOne({_id: this.inviteId});
    }
})