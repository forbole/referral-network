import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Invites } from '../invites.js';
import { Recommendations } from '../../recommendations/recommendations.js'
import moment from 'moment';

Meteor.methods({
    'invite.insert'(name, toName, email, relationship, event, recommendation, skills){
        check(name, String);
        check(toName, String);
        check(email, String);
        check(relationship, String);
        check(event, String);
        check(recommendation, String);
        check(skills, String);

        let recoId = '';

        if ((event != '') && (recommendation != '')){
            skills = skills.split(',');
            recoId = Recommendations.insert({
                name: name,
                toName: toName,
                toUserId: '',
                email: email,
                event: event,
                recommendation: recommendation,
                skills: skills,
                accepted: false,
                createdAt: new Date(),
                createdBy: Meteor.userId()
            });
        }

        let inviteId = Invites.insert({
            name: name,
            toName: toName,
            email:email,
            relationship: relationship,
            recoId: recoId,
            createdAt: new Date(),
            createdBy: Meteor.userId()
        });

        let to = toName+' <'+email+'>';
        let from = name+' <invite@forbole.com>';
        let subject = name+' has invited you to connect on Forbole!';
        let message = 'Dear '+toName+',\n\n';
        message += 'Bravo! '+name+' has invited you to connect.\n\n';
        if ((event != '') && (recommendation != '')){
            message += name+" has made the following recommendation about you:\n\n\n"
            message += '"'+recommendation+'"\n\n\n';
            message += 'You have also unlocked '+skills.length+' endorsements!';
            for (let skill of skills){
            message += '['+skill+'] ';
            }
        }
        message += '\n\nPlease accept your invitation by clicking here:\n\n';
        message += Meteor.settings.public.host+'/invite/accept/'+inviteId+'\n\n';
        message += 'By making recommendation and referral, we can help each other to become more successful. This is why we started Forbole, a blockchain-based social network that changes the way we make business connection!\n\n';
        message += 'We are currently in beta version. We love to hear your feedback!\n\n';
        message += 'Thanks,\n';
        message += 'Forbole\n';
        message += 'Recommend · Refer · Reward';

        this.unblock();
        Email.send({
            to: email,
            from: from,
            replyTo: name+'<'+Meteor.user().emails[0].address+'>',
            subject: subject,
            text: message
        });

        return inviteId;
    },
    'invites.accept'(inviteId){
        check(inviteId, String);

        if (Meteor.user()){
            let invite = Invites.findOne({_id: inviteId});
            if (invite && !invite.accepted){
                // let userState = Meteor.users.update({_id: this.userId}, {
                // //   $addToSet: {skills:{$each:reco.skills}}
                // });

                let inviteState = Invites.update(inviteId, {
                    $set:{
                        accepted: true,
                        acceptedBy: this.userId
                    }
                });

                // add to activity collection
                Meteor.call('activities.insert', invite.createdBy, 'invite', inviteId, (error, result) => {
                    if (error){
                        console.log(error);
                    }

                    if (result){
                        console.log(result);
                    }
                });

                if (invite.recoId != ''){
                    let reco = Recommendations.findOne(invite.recoId);
                    Recommendations.update(invite.recoId, {
                        $set:{
                            accepted: true,
                            acceptedBy: this.userId
                        }
                    });
                    Meteor.call('contributions.insert', 'recommendation', invite.recoId, reco.createdBy, 5, function(err, result){
                        if (err){
                          console.log(err);
                        }
                        if (result){
                          console.log('contributions add');
                        }
                    });
                }
                // if (userState && inviteState){
                if (inviteState){
                    
                    return "success";
                }
                else return "failed";
            }
        }
    }
});
