ServiceConfiguration.configurations.upsert({
  service: "facebook"
}, {
  $set: {
    appId: Meteor.settings.facebook.appId,
    loginStyle: "popup",
    secret: Meteor.settings.facebook.secret
  }
});

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

      generateUsername = function(username) {
          let count;
          username = username.toLowerCase().trim().replace(" ", "");
          count = Meteor.users.find({"username": username}).count();
          if (count === 0) {
              return username;
          }
          else {
              return username + (count + 1)
          }
      }

      // username = user.services.facebook.name;
      user.username = generateUsername(user.services.facebook.name);

      user.profile = options.profile; // We still want the default 'profile' behavior.
    }
  }else{
    if (!options.profile) options.profile = {};
    options.profile.picture = "/img/faces/default-profile.svg";
    user.profile = options.profile;
  }
  return user;
});
