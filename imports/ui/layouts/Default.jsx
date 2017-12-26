import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Match, Redirect, Switch } from 'react-router-dom';
// import Navbar from './../ui/navigation/navbar';
const DefaultLayout = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={matchProps => (
      <div className="DefaultLayout">
        <div className="Header">Header</div>
          <Component {...matchProps} />
        <div className="Footer">Footer</div>
      </div>
    )} />
  )
};

export default DefaultLayout;
