import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Match, Redirect, Switch } from 'react-router-dom';
import Header from '/imports/ui/components/PublicHeader.jsx';
import Footer from '/imports/ui/components/Footer.jsx';
import { Alert } from '/imports/ui/components/ForboleComponents.jsx';
// import Navbar from './../ui/navigation/navbar';
const PublicLayout = ({component: Component, ...rest}) => {
  let state = rest.location.state;
  return (
    <Route {...rest} render={matchProps => (
      <div>
        <Header />
        <div className="default">
          {(state)?<Alert type="info" text="Please login to continue." />:''}
          <div className="page-header header-filter login-header">
            <Component {...matchProps} />
            <Footer />
          </div>
        </div>
      </div>
    )} />
  )
};

export default PublicLayout;
