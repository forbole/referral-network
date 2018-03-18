import { Accounts } from 'meteor/std:accounts-ui';

Accounts.config({
  sendVerificationEmail: true,
  forbidClientAccountCreation: false
});

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL',
  // loginPath: '/login',
  // signUpPath: '/signup',
  // resetPasswordPath: '/reset-password',
  // profilePath: '/profile',
  minimumPasswordLength: 7
});
