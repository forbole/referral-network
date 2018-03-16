let smtpUser = Meteor.settings.smtp.username;
let smtpPassword = Meteor.settings.smtp.password;
let smtpServer = Meteor.settings.smtp.server;
let smtpPort = Meteor.settings.smtp.port
process.env.MAIL_URL = 'smtp://'+smtpUser+':'+smtpPassword+'@'+smtpServer+':'+smtpPort;
