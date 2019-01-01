import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Recommendations } from '../recommendations.js';
import { Email } from 'meteor/email';
import moment from 'moment';

Meteor.methods({
  'Recommendations.insert'(name, toName, email, event, recommendation, skills, toUserId) {
    check(name, String);
    check(toName, String);
    check(email, String);
    check(event, String);
    check(recommendation, String);
    check(skills, String);
    check(toUserId, String);

    skills = skills.split(',');

    if ((toUserId != '') && (toUserId != this.userId)){
      let user = Meteor.users.findOne({_id: toUserId});
      if (user){
        email = user.emails[0].address;
        toName = user.profile.name;
      }
    }
    let id = Recommendations.insert({
      name: name,
      toName: toName,
      toUserId: toUserId,
      email: email,
      event: event,
      recommendation: recommendation,
      skills: skills,
      accepted: false,
      createdAt: new Date(),
      createdBy: Meteor.userId()
    });

    let reco = Recommendations.find({_id: id}).fetch();

    let to = toName+' <'+email+'>';
    let from = name+' <recommend@forbole.com>';
    let subject = name+' has recommended you on Forbole!';
    let message = 'Dear '+toName+',\n\n';
    message += 'Bravo! '+name+' has made the following recommendation about you.\n\n\n';
    message += '"'+recommendation+'"\n\n\n';
    message += 'The user has also endorsed you these '+skills.length+' skills: ';
    for (let skill of skills){
      message += '['+skill+'] ';
    }
    message += '\n\nPlease accept your recommendation by clicking here:\n\n';
    message += Meteor.settings.public.host+'/recommendation/accept/'+id+'\n\n';
    message += 'At Forbole, we help each other to succeed. If we write recommendations and endorse the skills of each other, we will all do better in our business and career!\n\n';
    message += 'We keep improving our prototype every day. We invite you to join us by accepting this recommendation, complete your profile and start to make endorsements for the people you trust. One more thing, we are a blockchain project and we will reward users with our crypto-tokens once we are ready. Stay tuned!\n\n';
    message += 'We love to hear your feedback!\n\n';
    message += 'Thanks,\n\n';
    message += 'Forbole - Recommend · Refer · Reward';

    this.unblock();
    Email.send({
      to: to,
      from: from,
      replyTo: name+'<'+Meteor.user().emails[0].address+'>',
      subject: subject,
      text: message
    });

    return reco;
  },
  'recommendations.accept'(recoId){
    check(recoId, String);

    if (Meteor.user()){
      let reco = Recommendations.findOne({_id: recoId});
      if (reco && !reco.accepted){
        let userState = Meteor.users.update({_id: this.userId}, {
          $addToSet: {skills:{$each:reco.skills}}
        });

        let recoState = Recommendations.update(recoId, {
          $set:{
            accepted: true,
            acceptedBy: this.userId
          }
        });

        // add to activity collection
        Meteor.call('activities.insert', reco.createdBy, 'recommendation', recoId, (error, result) => {
            if (error){
                console.log(error);
            }

            if (result){
                console.log(result);
            }
        });
        
        if (userState && recoState){
          Meteor.call('contributions.insert', 'recommendation', reco._id, reco.createdBy, 5, function(err, result){
            if (err){
              console.log(err);
            }
            if (result){
              console.log('contributions add');
            }
          });
          return "success";
        }
        else return "failed";
      }
    }
  }
});
