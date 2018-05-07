import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Connections } from './connections.js';
// import { Email } from 'meteor/email';
import moment from 'moment';

Meteor.methods({
  'Connections.insert'(userId, inviteId, recoId){
    check(userId, String);
    check(inviteId, String);
    check(recoId, String);

    let connection = Connections.findOne( { users : { $all : [this.userId, userId] } } );

    if (!connection){
      console.log('not connected yet.');
      return Connections.insert({
        users: [this.userId, userId],
        inviteId: inviteId,
        recoId: recoId,
        createdAt: new Date()
      })
    }
    else{
      return connection._id;
    }
  }
});
