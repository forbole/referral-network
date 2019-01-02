// import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
// import { Accounts, STATES } from 'meteor/std:accounts-ui';
import PrivateRoute from '../ui/routes/PrivateRouteContainer.js';
import DefaultLayout from '../ui/layouts/DefaultContainer.js';
import LoginLayout from '../ui/layouts/Login.jsx';
import PropTypes from 'prop-types';

import Timeline from '../ui/timeline/TimelineContainer.js';
// import Home from '../ui/pages/Home.jsx';
import NotFound from '../ui/pages/NotFound.jsx';
import Login from '../ui/users/Login.jsx';
import Register from '../ui/users/Register.jsx';
import Profile from '../ui/users/ProfileContainer.js';
// import Wallet from '../ui/users/Wallet.jsx';
import ProfileEdit from '../ui/users/EditContainer.js';
import Recommend from '../ui/recommendations/RecommendContainer.js';
import Recommendation from '../ui/recommendations/RecommendationContainer.js';
import Connections from '../ui/connections/ListContainer.js';
import Contributions from '../ui/contributions/ListContainer.js';
import Invite from '../ui/invites/InviteContainer.js';
import InviteAccept from '../ui/invites/InviteAcceptContainer.js';

import Refer from '../ui/referrals/ReferContainer.js';
import ReferralAccept from '../ui/referrals/AcceptContainer.js';
import ReferralReceive from '../ui/referrals/ReceiveContainer.js';


// App component - represents the whole app
export default class App extends Component {
    constructor(props){
        super(props);
        // this.state = {
        //   user: props.currentUser?props.currentUser:''
        // }
    }

    componentDidUpdate(prevProps, prevState){
      // console.log('App componentDidMount');
      //rerun jquery for the current DOM

        let window_width = $(window).width();

        let $navbar = $('.navbar[color-on-scroll]');
        let scroll_distance = $navbar.attr('color-on-scroll') || 300;

        let $navbar_collapse = $('.navbar').find('.navbar-collapse');

        //  Activate the Tooltips
        $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();

        //    Activate bootstrap-select
        if($(".selectpicker").length != 0){
            $(".selectpicker").selectpicker();
        }

        // Activate Popovers
        $('[data-toggle="popover"]').popover();

        // Active Carousel
        $('.carousel').carousel({
          interval: 3000
        });


        if (window_width >= 768){
            let big_image = $('.page-header[data-parallax="true"]');
            if(big_image.length != 0){
               $(window).on('scroll', materialKitDemo.checkScrollForParallax);
            }

        }
    }

    render() {
        return (
            <Router>
              <Switch>
                <PrivateRoute path="/" exact={true} component={Timeline} />
                <LoginLayout path="/login" component={Login} />
                <LoginLayout path="/signup" component={Register} />
                <PrivateRoute path="/@:username/contributions" exact={true} component={Contributions} />
                <PrivateRoute path="/@:username/connections" exact={true} component={Connections}/>
                <PrivateRoute path="/connections" component={Connections}/>
                <DefaultLayout path="/@:username?" component={Profile} />
                <PrivateRoute path="/settings" component={ProfileEdit} />
                <DefaultLayout path="/recommendation/accept/:id" exact={true} component={Recommendation} />
                <PrivateRoute path="/invite" exact={true} component={Invite} />
                <DefaultLayout path="/invite/accept/:id" exact={true} component={InviteAccept} />
                <PrivateRoute path="/recommend/:username" component={Recommend} />
                <PrivateRoute path="/refer/:username" exact={true} component={Refer} />
                <PrivateRoute path="/referrals/receive/:id" exact={true} component={ReferralReceive} />
                <DefaultLayout path="/referrals/accept/:id" exact={true} component={ReferralAccept} />
                <DefaultLayout path="*" component={NotFound}/>
              </Switch>
            </Router>
        );
    }
}

App.propTypes = {
    loggingIn: PropTypes.bool,
    currentUser: PropTypes.object,
};
