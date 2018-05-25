// Import server startup through a single index entry point

import './fixtures.js';
import './register-api.js';
import './smtp.js';
import './accounts.js';
import './fbcli.js';

// Add GTM
if (process.env.ROOT_URL == 'https://mvp.forbole.com')
  addGoogleTagManager('GTM-NRHTQQV');
