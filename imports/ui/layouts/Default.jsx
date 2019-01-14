import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Match, Redirect, Switch } from 'react-router-dom';
import Header from '/imports/ui/components/HeaderContainer.js';
import PublicHeader from '/imports/ui/components/PublicHeader.jsx';
import Footer from '/imports/ui/components/Footer.jsx';
import { ToastContainer } from 'react-toastify';

// import Navbar from './../ui/navigation/navbar';
const DefaultLayout = ({component: Component, transHead: transHead, ...rest}) => {
  // let mainClass = (transHead)?'':"main";
  if (Meteor.loggingIn()){
    return <div>Logging in... </div>
  }
  else {
    return (
      <Route {...rest} render={matchProps => {
          return (
            <div className="default">
              <ToastContainer />
              {Meteor.user()?<Header />:<PublicHeader />}
                  <Component {...matchProps} />
              <Footer {...matchProps}/>
            </div>
        )
        }} />
    )
  }
};

export default DefaultLayout;
