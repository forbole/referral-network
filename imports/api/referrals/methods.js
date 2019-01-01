import { Meteor } from 'meteor/meteor';
import { Referrals } from './referrals.js';
import { check } from 'meteor/check';
import { Email } from 'meteor/email';
import { Accounts } from 'meteor/accounts-base'

Meteor.methods({
    'referrals.insert': function(name, email, details, urgency, refereeId){
        check(name, String);
        check(email, String);
        check(details, String);
        check(urgency, String);
        check(refereeId, String);

        let acceptUser = Accounts.findUserByEmail(email);

        let acceptUserId = null;

        if (acceptUser){
            acceptUserId = acceptUser._id;
        }

        let referralId =  Referrals.insert({
            name:name,
            email:email,
            details:details,
            urgency: urgency,
            refereeId:refereeId,
            acceptUserId: acceptUserId,
            createdBy: this.userId,
            createdAt: new Date()
        });

        // send emails to referee and receiver

        let referrer = Meteor.users.findOne({_id:this.userId});
        let referee = Meteor.users.findOne({_id:refereeId});

        // to referee
        let to = referee.profile.name+' <'+referee.emails[0].address+'>';
        let from = 'Forbole Referral <referral@forbole.com>';
        let subject = referrer.profile.firstname+' has a referral for you on Forbole!';
        let message = 'Dear '+referee.profile.firstname+',\n\n';
        message += 'Bravo! '+referrer.profile.name+' has given you a referral.\n\n\n';
        message += 'Please follow the link below to view the details of the referral.\n\n';
        message += Meteor.settings.public.host+'/referrals/receive/'+referralId+'\n\n';
        message += 'At Forbole, we help each other to succeed. If we give referrals and endorse the skills of each other, we will all do better in our business and career!\n\n';
        message += 'We keep improving our prototype every day. We love to hear your feedback!\n\n';
        message += 'Thanks,\n\n';
        message += 'FRN - Recommend · Refer · Reward';

        this.unblock();
        Email.send({
          to: to,
          from: from,
          subject: subject,
          text: message
        });

        // email to friend

        to = name+' <'+email+'>';
        from = 'Forbole Referral <referral@forbole.com>';
        subject = referrer.profile.firstname+' has referred you to '+referee.profile.name+' on Forbole!';
        message = 'Dear '+name+',\n\n';
        message += 'Bravo! '+referrer.profile.name+' has referred you on Forbole.\n\n\n';
        message += 'Please follow the link below to view the details of the referral.\n\n';
        message += Meteor.settings.public.host+'/referrals/accept/'+referralId+'\n\n';
        message += 'At Forbole, we help each other to succeed. If we give referrals and endorse the skills of each other, we will all do better in our business and career!\n\n';
        message += 'We keep improving our prototype every day. We love to hear your feedback!\n\n';
        message += 'Thanks,\n\n';
        message += 'FRN - Recommend · Refer · Reward';

        this.unblock();
        Email.send({
          to: to,
          from: from,
          subject: subject,
          text: message
        });

        return referralId;
    },
    'referrals.accept': function(referralId){
        check(referralId, String);

        let referral = Referrals.findOne({_id:referralId});
        if (!referral){
            throw new Meteor.Error('no-referral-found', 'No referral is found.');
        }
        
        if (referral.acceptUserId){
            if (referral.acceptUserId != this.userId){
                throw new Meteor.Error(304, "Permission denied.");
            }
        }

        let ref = Referrals.update({_id:referralId}, {$set:{acceptedBy:this.userId, acceptUserId: this.userId, acceptedAt: new Date()}});
        if (ref){
            // add to activity collection
            Meteor.call('activities.insert', referral.createdBy, 'referral', referralId, (error, result) => {
                if (error){
                    console.log(error);
                }

                if (result){
                    console.log(result);
                }
            });
            
            Meteor.call('contributions.insert', 'referral', referralId, referral.createdBy, 3, (err, result) => {
                if (err){
                    toast.err(err);
                }
                if (result){

                    // console.log(result);
                    Meteor.call('connections.insert', referral.createdBy, 'referral', referralId, (err, result) => {
                        if (err){
                            throw new Meteor.Error(500, "Make connection error.");
                        }

                        if (result){
                            if (result != -1){
                                // add to activity collection
                                Meteor.call('activities.insert', referral.createdBy, 'introduction', referralId, (error, result) => {
                                    if (error){
                                        console.log(error);
                                    }

                                    if (result){
                                        console.log(result);
                                    }
                                });

                                // add connection contribution score if there is new connection
                                Meteor.call('contributions.insert', 'connection', result, this.userId, 1, function(err, result){
                                    if (err){
                                      console.log(err);
                                    }
                                    if (result){
                                      console.log('contributions add');
                                    }
                                });

                            }
                        }
                    });
                }
            });

            // email referee and referer
        }

        return ref;
    },
    'referrals.receive': function(referralId){
        check(referralId, String);
        
        let referral = Referrals.findOne({_id:referralId});
        if (!referral){
            throw new Meteor.Error('no-referral-found', 'No referral is found.');
        }
        
        // if (referral.acceptUserId){
        if (referral.refereeId != this.userId){
            throw new Meteor.Error(304, "Permission denied.");
        }
        // }

        let ref = Referrals.update({_id:referralId}, {$set:{receivedBy:this.userId, receivedAt: new Date()}});
        if (ref){
            // add to activity collection
            Meteor.call('activities.insert', referral.createdBy, 'received-referral', referralId, (error, result) => {
                if (error){
                    console.log(error);
                }

                if (result){
                    console.log(result);
                }
            });

            Meteor.call('contributions.insert', 'received-referral', referralId, referral.createdBy, 2, (err, result) => {
                if (err){
                    toast.err(err);
                }
                if (result){
                    // console.log(result);
                    Meteor.call('connections.insert', referral.createdBy, 'receive-referral', referralId, (err, result) => {
                        if (err){
                            throw new Meteor.Error(500, "Make connection error.");
                        }

                        if (result){
                            if (result != -1){
                                // add to activity collection
                                Meteor.call('activities.insert', referral.createdBy, 'introduction', referralId, (error, result) => {
                                    if (error){
                                        console.log(error);
                                    }

                                    if (result){
                                        console.log(result);
                                    }
                                });
                                
                                // add connection contribution score if there is new connection
                                Meteor.call('contributions.insert', 'connection', result, this.userId, 1, function(err, result){
                                    if (err){
                                      console.log(err);
                                    }
                                    if (result){
                                      console.log('contributions add');
                                    }
                                });

                            }
                        }
                    });
                }
            });

            // email acceptor and referrer
        }

        return ref;        
    }
})