import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { InviteSession } from './invite_sessions.js';

Meteor.methods({
    'invite.session': function(session, inviteId, inviteType){
        let id = InviteSession.insert({session, inviteId, inviteType});
        if (id){
            return id;
        }
        else return false;
    }
})