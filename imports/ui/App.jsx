// import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
// import { Accounts, STATES } from 'meteor/std:accounts-ui';
import PrivateRoute from '/imports/ui/routes/PrivateRouteContainer.js';
import DefaultLayout from '/imports/ui/layouts/DefaultContainer.js';
import LoginLayout from '/imports/ui/layouts/Login.jsx';
import PropTypes from 'prop-types';

import Home from '/imports/ui/pages/Home.jsx';
import NotFound from '/imports/ui/pages/NotFound.jsx';
import Login from '/imports/ui/users/Login.jsx';
import Register from '/imports/ui/users/Register.jsx';
import Profile from '/imports/ui/users/ProfileContainer.js';
// import Wallet from '/imports/ui/users/Wallet.jsx';
import ProfileEdit from '/imports/ui/users/EditContainer.js';
import Recommend from '/imports/ui/recommendations/RecommendContainer.js';
import Recommendation from '/imports/ui/recommendations/RecommendationContainer.js';
import Connections from '/imports/ui/connections/ListContainer.js';
import Contributions from '/imports/ui/contributions/ListContainer.js';
import Invite from '/imports/ui/invites/InviteContainer.js';
import InviteAccept from '/imports/ui/invites/InviteAcceptContainer.js';

import Refer from '/imports/ui/referrals/ReferContainer.js';
import ReferralAccept from '/imports/ui/referrals/Accept.jsx';
import ReferralReceive from '/imports/ui/referrals/Receive.jsx';


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
                <PrivateRoute path="/" exact={true} component={Home} />
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
