import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Connections } from '../connections.js';
// import { Email } from 'meteor/email';
import moment from 'moment';

Meteor.methods({
  'connections.insert'(userId, type, propId){
    check(userId, String);
    check(type, String);
    check(propId, String);

    let connection = Connections.findOne( { users : { $all : [this.userId, userId] } } );

    if (!connection){
      console.log('not connected yet.');
      return Connections.insert({
        users: [this.userId, userId],
        type: type,
        propId: propId,
        createdAt: new Date()
      })
    }
    else{
      return -1;
    }
  }
});
