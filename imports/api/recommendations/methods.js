import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Recommendations } from './recommendations.js';
import { Email } from 'meteor/email';

Meteor.methods({
  'Recommendations.insert'(name, toName, email, recommendation, skills) {
    check(name, String);
    check(toName, String);
    check(email, String);
    check(recommendation, String);
    check(skills, String);

    skills = skills.split(',');

    console.log(name);
    console.log(toName);
    console.log(email);
    console.log(recommendation);
    console.log(skills);

    return this.userId;
    // return Recommendations.insert({
    //   url,
    //   title,
    //   createdAt: new Date(),
    // });
  },
});
