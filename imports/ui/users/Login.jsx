import React, { Component } from 'react';

const Login = () => {
  return (
      <div className="container">
        <div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">
					<div className="card card-signup">
            <div className="header header-primary text-center">
              <h4 className="card-title">Log in / Signup</h4>
            </div>
            <div className="card-content">
              <Accounts.ui.LoginForm />
            </div>
          </div>
        </div>
      </div>
    )
}

export default Login;
