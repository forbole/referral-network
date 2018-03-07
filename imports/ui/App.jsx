import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { Accounts, STATES } from 'meteor/std:accounts-ui';
import PrivateRoute from '/imports/ui/routes/PrivateRouteContainer.js';
import DefaultLayout from '/imports/ui/layouts/DefaultContainer.js';
import PublicLayout from '/imports/ui/layouts/Public.jsx';
// import EmptyLayout from '/imports/ui/layouts/Empty.jsx';

import Home from '/imports/ui/pages/Home.jsx';
import NotFound from '/imports/ui/pages/NotFound.jsx';
import Login from '/imports/ui/users/Login.jsx';
import Register from '/imports/ui/users/Register.jsx';
import Profile from '/imports/ui/pages/Profile.jsx';
import Recommend from '/imports/ui/pages/Recommend.jsx';
import Recommendation from '/imports/ui/pages/Recommendation.jsx';
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
                <PrivateRoute exact={true} path="/" component={Home} />
                <PublicLayout path="/login" component={Login} />
                <PublicLayout path="/signup" component={Register} />
                <PrivateRoute path="/profile" component={Profile}/>
                <PrivateRoute path="/recommend" component={Recommend}/>
                <PrivateRoute path="/recommendation" component={Recommendation}/>
                <PublicLayout path="*" component={NotFound}/>
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
