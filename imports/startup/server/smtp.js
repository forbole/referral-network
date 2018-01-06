let sgUser = Meteor.settings.sendgrid.username;
let sgPass = Meteor.settings.sendgrid.password;
process.env.MAIL_URL = 'smtp://{sgUser}:{sgPass}@smtp.sendgrid.net:587';
