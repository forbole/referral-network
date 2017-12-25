// Client entry point, imports all client code

import '/imports/startup/client';
import '/imports/startup/both';
import '/imports/ui/stylesheets/bootstrap.min.css';
import '/imports/ui/stylesheets/material-kit.css';
import '/imports/ui/stylesheets/styles.css';

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '/imports/ui/App.js';

Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});
