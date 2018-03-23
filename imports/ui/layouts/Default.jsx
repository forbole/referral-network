import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Match, Redirect, Switch } from 'react-router-dom';
import Header from '/imports/ui/components/HeaderContainer.js';
import PublicHeader from '/imports/ui/components/PublicHeader.jsx';
import Footer from '/imports/ui/components/Footer.jsx';

// import Navbar from './../ui/navigation/navbar';
const DefaultLayout = ({component: Component, transHead: transHead, ...rest}) => {
  // let mainClass = (transHead)?'':"main";
  return (
    <Route {...rest} render={matchProps => {
        return (
          <div className="default">
            {Meteor.userId()?<Header />:<PublicHeader />}
                <Component {...matchProps} />
            <Footer />
          </div>
      )
      }} />
  )
};

export default DefaultLayout;
