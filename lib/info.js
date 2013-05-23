//The info module will read values from the package.json file.
//This will be loaded synchronously, but since this only will happen on first
//require if this module thats ok (nodejs modules are getting cached).
var packageJSON = require('../package.json');

//Use the config system to read component id.
var config = require('./config');

//Make all properties of info object available to exports.
var info = module.exports;

//Will return the component name specifeid in package.json.
info.getName = function() {
	//Simply return the name specified in package.json.
	return packageJSON['name'];
};

//Will return the version specified in package.json.
//If numerical is set to true, then the 'v' is stripped away
//from the returned version.
info.getVersion = function(numerical) {
	//Get the version specified in package.json.
	var version = packageJSON['version'];

	//Check if numerical version is requested.
	if(numerical === true) {
		//The 'v' from the version should be stripped away.

		//Check if the first character is a 'v'.
		if(version.charAt(0) === 'v') {
			//Then strip it away.

			//Remove the first letter.
			version = version.substr(1);
		}
	}
	
	//Return the version variable after potential modifications.
	return version;
};

//Will return the ID of the component. This will read the config file for an ID,
//and default to ID = 0 if nothing is present in the config.
info.getID = function() {
	//Simply return the config id, since the file have set the defaults to 0 if not present in config.

	//Return the id field of component in config.
	return config.get('component:id');
};