let smtpUser = Meteor.settings.mailgun.username;
let smtpPassword = Meteor.settings.mailgun.password;
let smtpServer = Meteor.settings.mailgun.server;
let smtpPort = Meteor.settngs.mailgun.port
process.env.MAIL_URL = 'smtp://{smtpUser}:{smtpPassword}@{smtpServer}:{smtpPort}';
