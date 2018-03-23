import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Match, Redirect, Switch } from 'react-router-dom';
import Header from '/imports/ui/components/PublicHeader.jsx';
import Footer from '/imports/ui/components/Footer.jsx';
// import Navbar from './../ui/navigation/navbar';
const PublicLayout = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={matchProps => (
      <div>
        <Header />
        <div className="default">
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
