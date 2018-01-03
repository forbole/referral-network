import React, { Component } from 'react';
import { STATES } from 'meteor/std:accounts-ui';

const Register = () => {
  return (
    <div className="container"><Accounts.ui.LoginForm formState={STATES.SIGN_UP} /></div>
    )
}

export default Register;
