import { Accounts } from 'meteor/accounts-base'
import { WebApp } from 'meteor/webapp';

ServiceConfiguration.configurations.upsert({
  service: "facebook"
}, {
  $set: {
    appId: Meteor.settings.facebook.appId,
    secret: Meteor.settings.facebook.secret
  }
});

ServiceConfiguration.configurations.upsert(
  { "service": "linkedin" },
  {
    $set: {
      "clientId": "78sqdxiq74fb12",
      "secret": "EStJrtmhuDZpHLqo"
    }
  }
);

generateUsername = function (username) {
  let count;
  username = username.toLowerCase().trim().replace(" ", "");
  count = Meteor.users.find({ "username": username }).count();
  if (count === 0) {
    return username;
  }
  else {
    return username + (count + 1)
  }
}

// during new account creation get user picture from Facebook and save it on user object
Accounts.onCreateUser(function(options, user) {
  if (typeof user.services.facebook != "undefined"){
    user.emails = [{
        address: user.services.facebook.email,
        verified: true,
    }];

    if(options.profile) {
      options.profile.picture = "https://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
      options.profile.firstname = user.services.facebook.first_name;
      options.profile.lastname = user.services.facebook.last_name;

      // username = user.services.facebook.name;
      user.username = generateUsername(user.services.facebook.name);

      user.profile = options.profile; // We still want the default 'profile' behavior.
    }
  }
  else if (typeof user.services.linkedin != "undefined") {
    user.emails = [{
      address: options.profile.emailAddress,
      verified: true,
    }];
    if (options.profile){
      options.profile.picture = user.services.linkedin.pictureUrl;
      options.profile.firstname = user.services.linkedin.firstName;
      options.profile.lastname = user.services.linkedin.lastName;
      options.profile.name = user.services.linkedin.firstName + " " + user.services.linkedin.lastName;
      options.profile.position = user.services.linkedin.positions.values[0].title + " at " + user.services.linkedin.positions.values[0].company.name;
      options.profile.location = user.services.linkedin.location.name;
      delete options.profile.firstName;
      delete options.profile.lastName;
      delete options.profile.emailAddress;

      user.username = generateUsername(user.services.linkedin.firstName + " " + user.services.linkedin.lastName);

      user.profile = options.profile;
    }
  }
  else{
    if (!options.profile) options.profile = {};
    options.profile.picture = "/img/faces/default-profile.svg";
    user.profile = options.profile;
  }

  // Create blockchain key and add key information here
  
  return user;
});

Accounts.emailTemplates.siteName = 'Forbole – Recommend · Refer · Reward';
Accounts.emailTemplates.from = 'Forbole <refer@forbole.com>';

Accounts.emailTemplates.enrollAccount.subject = (user) => {
  return `Welcome to the Forbole network, ${user.profile.name}`;
};

// Accounts.emailTemplates.enrollAccount.text = (user, url) => {
//   return 'You have been selected to participate in building a better future!'
//     + ' To activate your account, simply click the link below:\n\n'
//     + url;
// };

Accounts.emailTemplates.resetPassword.from = () => {
  // Overrides the value set in `Accounts.emailTemplates.from` when resetting
  // passwords.
  return 'Forbole Password Reset <no-reply@forbole.com>';
};
// Accounts.emailTemplates.verifyEmail = {
//    subject() {
//       return "Activate your account now!";
//    },
//    text(user, url) {
//       return `Hey ${user}! Verify your e-mail by following this link: ${url}`;
//    }
// };
