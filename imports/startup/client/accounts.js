import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { Accounts, STATES } from 'meteor/std:accounts-ui';

Accounts.config({
  // sendVerificationEmail: true,
  // forbidClientAccountCreation: false
});

Accounts.ui.config({
  passwordSignupFields: 'EMAIL_ONLY',
  onSignedInHook: () => Router.push('/'),
  loginPath: '/login',
  signUpPath: '/signup',
  resetPasswordPath: '/reset-password',
  // profilePath: '/profile',
  minimumPasswordLength: 8
});
