import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { InviteSession } from './invite_sessions.js';

Meteor.methods({
    'invite.session': function(session, inviteId){
        let id = InviteSession.insert({session, inviteId});
        if (id){
            return id;
        }
        else return false;
    }
})