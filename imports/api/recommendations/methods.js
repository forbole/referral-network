import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Recommendations } from './recommendations.js';
import { Email } from 'meteor/email';
import moment from 'moment';

Meteor.methods({
  'Recommendations.insert'(name, toName, email, event, recommendation, skills) {
    check(name, String);
    check(toName, String);
    check(email, String);
    check(event, String);
    check(recommendation, String);
    check(skills, String);

    skills = skills.split(',');

    let id = Recommendations.insert({
      name: name,
      toName: toName,
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
    let message = 'Hi '+toName+',\n\n';
    message += name+' has recommended you on Forbole business referral network.\n\n';
    message += 'Please accept your recommendation by clicking here:\n\n';
    message += Meteor.settings.public.host+'/recommendation/accept/'+id+'\n\n';
    message += 'Thanks,\n\n';
    message += 'Forbole - Recommend · Refer · Reward';

    this.unblock();
    // console.log(process.env.MAIL_URL);
    Email.send({
      to: email,
      from: from,
      subject: subject,
      text: message
    });

    return reco;
  },
  'recommendations.accept'(recoId){
    check(recoId, String);

    if (Meteor.user()){
      let reco = Recommendations.find({_id: recoId}).fetch();
      if (reco && !reco.accepted){
        return Recommendations.update(recoId, {
          $set:{
            accepted: true,
            acceptedBy: this.userId
          }
        });
      }
    }
  }
});
