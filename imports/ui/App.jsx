import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { Accounts, STATES } from 'meteor/std:accounts-ui';
import DefaultLayout from '/imports/ui/layouts/Default.jsx';
import EmptyLayout from '/imports/ui/layouts/Empty.jsx';

import Home from '/imports/ui/pages/Home.jsx';
import NotFound from '/imports/ui/pages/NotFound.jsx';
import Login from '/imports/ui/users/Login.jsx';
import Register from '/imports/ui/users/Register.jsx';
// import About from './pages/about.jsx';
// import SignIn from './pages/sign_in.jsx';


// App component - represents the whole app
export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
          user: props.currentUser?props.currentUser:''
        }
    }


    render() {
        return (
            <Router>
              <Switch>
                <DefaultLayout exact={true} path="/" component={Home} user={this.state.currentUser} />
                <DefaultLayout path="/login" component={Login} />
                <DefaultLayout path="/signup" component={Register} />
                <DefaultLayout path="*" component={NotFound}/>
              </Switch>
                {/*}<Route path="/about" component={About} />*/}
              {/*
              <Route component={EmptyLayout}>
                <Route path="/sign-in" component={SignIn} />
              </Route>
              <Route path="*" component={NotFound}/>
              */}
            </Router>
        );
    }
}
