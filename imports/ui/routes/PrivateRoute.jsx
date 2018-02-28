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
      // console.log(this.props);
      var { component, ...rest } = this.props;
      var props = this.props;
      // console.log(component);

      if (this.props.loggingIn){
        return (
          <div>Loggin In</div>
        )
      }
      else if (this.props.currentUser){
        return (
          <Route {...rest} render={props =>
                <DefaultLayout {...props} component={component} />}
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
