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
	var verson = packageJSON['version'];

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
	//Read the component object of config system.
	var component = config['component'];

	//Check if it exists.
	if(component !== undefined) {
		//It does.

		//Now try to read the id of it.
		var id = component['id'];

		//Check if the id exists in the component object.
		if(id === undefined) {
			//It doesnt.

			//Default to ID = 0.
			id = 0;
		}

		//Return either the component id or the default value 0.
		return id;
	}

	//No component object found in config.

	//Return default ID value 0.
	return 0;
};