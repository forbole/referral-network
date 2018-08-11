// Import server startup through a single index entry point

import './fixtures.js';
import './register-api.js';
import './smtp.js';
import './accounts.js';
import './fbcli.js';

Meteor.startup(function () {
  // Add GTM
  if (process.env.ROOT_URL == 'https://mvp.forbole.com')
    addGoogleTagManager('GTM-NRHTQQV');

  WebApp.connectHandlers.use("/invite/accept/", function (req, res, next) {
    console.log(req.url);
    // comment this if you redirect to another route
    next();
  });
});
