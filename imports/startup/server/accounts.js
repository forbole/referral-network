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
  if (user.services.facebook.accessToken){
    if(options.profile) {
      options.profile.picture = "https://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
      user.profile = options.profile; // We still want the default 'profile' behavior.
    }
  }else{
    if (!options.profile) options.profile = {};
    options.profile.picture = "/img/faces/default-profile.svg";
    user.profile = options.profile;
  }
  return user;
});
