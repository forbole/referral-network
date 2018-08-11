import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Invites } from './invites.js';
import { Recommendations } from '../recommendations/recommendations.js'
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
            message += name+" has made the following recommendation about you.\n\n\n"
            message += '"'+recommendation+'"\n\n\n';
            message += 'The user has also endorsed you these '+skills.length+' skills: ';
            for (let skill of skills){
            message += '['+skill+'] ';
            }
        }
        message += '\n\nPlease accept your invitation by clicking here:\n\n';
        message += Meteor.settings.public.host+'/invite/accept/'+inviteId+'\n\n';
        message += 'At Forbole, we help each other to succeed. If we write recommendations and endorse the skills of each other, we will all do better in our business and career!\n\n';
        message += 'We keep improving our prototype every day. We invite you to join us by accepting this invitation, complete your profile and start to make endorsements for the people you trust. One more thing, we are a blockchain project and we will reward users with our crypto-tokens once we are ready. Stay tune!\n\n';
        message += 'We love to hear your feedback!\n\n';
        message += 'Thanks,\n';
        message += 'Forbole - Recommend · Refer · Reward';

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

                if (invite.recoId != ''){
                    let reco = Recommendations.findOne(invite.recoId);
                    let userState = Meteor.users.update({ _id: this.userId }, {
                        $addToSet: { skills: { $each: reco.skills } }
                    });
                    Recommendations.update(invite.recoId, {
                        $set:{
                            accepted: true,
                            acceptedBy: this.userId
                        }
                    });
                }
                // if (userState && inviteState){
                if (inviteState && userState){
                    return "success";
                }
                else return "failed";
            }
        }
    }
});
