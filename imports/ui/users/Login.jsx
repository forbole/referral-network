import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router-dom';
import { RegistrationForm } from './RegistrationForm.jsx';

class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      redirectToReferrer: false
    };

  }

  componentWillReceiveProps(nextProps){
    if (Meteor.userId()){
      this.setState({ redirectToReferrer: true });
    }
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };

    if (this.state.redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <div className="container">
          <div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">
  					<div className="card card-signup">
              <div className="header header-primary text-center">
                <h4 className="card-title">Log in / Signup</h4>
              </div>
              <div className="card-content">
                <RegistrationForm />
              </div>
            </div>
          </div>
        </div>
      </div>
      )
  }
}


export default Login;
