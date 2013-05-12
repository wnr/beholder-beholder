//Require the nconf module.
var nconf = require('nconf');

//Tell config system to prioritize arguments over file config values.
//nconf.argv().file({ file: './config.json'});

//Return the initialized nconf object.
module.exports = nconf;