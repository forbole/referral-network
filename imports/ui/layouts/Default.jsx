import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Match, Redirect, Switch } from 'react-router-dom';
import Header from '/imports/ui/components/Header.jsx';
import Footer from '/imports/ui/components/Footer.jsx';
// import Navbar from './../ui/navigation/navbar';
const DefaultLayout = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={matchProps => (
      <div className="default">
        <Header />
          <div className="main">
            <Component {...matchProps} />
          </div>
        <Footer />
      </div>
    )} />
  )
};

export default DefaultLayout;
