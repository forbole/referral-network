import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'
import { Accounts, STATES } from 'meteor/std:accounts-ui';
import DefaultLayout from '/imports/ui/layouts/Default.jsx';

class PrivateRoute extends Component {
  constructor(props){
    super(props);
  }

  render(){
      let { component, transHead, ...rest } = this.props;
      let props = this.props;
      if (this.props.loggingIn){
        return (
          <div>Loggin In</div>
        )
      }
      else if (this.props.currentUser){
        return (
          <Route {...rest} render={props =>
                <DefaultLayout {...props} component={component} transHead={this.props.transHead} />}
          />
        )
      }
      else {
        return (
          <Route {...rest} render={props =>
            <Redirect
              to={{
                pathname: "/login",
                state: { from: this.props.location }
              }}
            />}
          />
        )
      }
  }
}


export default PrivateRoute;
