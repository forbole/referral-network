import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import DefaultLayout from '/imports/ui/layouts/Default.jsx';
import EmptyLayout from '/imports/ui/layouts/Empty.jsx';
import Home from '/imports/ui/pages/Home.jsx';
// import About from './pages/about.jsx';
// import NotFound from './pages/not_found.jsx';
// import SignIn from './pages/sign_in.jsx';


// App component - represents the whole app
export default class App extends Component {
  render() {
    return (
      <Router>
        <DefaultLayout path="/" component={Home} />
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
