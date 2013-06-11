//-----------------------------------------------
// Dependencies
//-----------------------------------------------

//Require the nconf module.
var nconf = require('nconf');

//Require the utils module to use the validate function.
var validate = require('./utils').validate;

//-----------------------------------------------
// Exports
//-----------------------------------------------

//Expose the init function.
exports.init = init;

//-----------------------------------------------
// Public functions
//-----------------------------------------------

/**
 * Initializes the nconf system. Will first read argv, then config.json and lastly config_defaults.json.
 *
 * @param		{options}			The options object that holds options described below.
 * @option 	{argv} 				Tells if config should read from argv. If set to 'true', argv will be read as first priority. Default is 'true'.
 * @option 	{config}			The filename of the config file to be read as second priority. Default is './config.json'.
 * @option 	{defaults}		The filename of the config file to be read as third priority. Default is './config_defaults.json'.
 *
 * @return The initialized nconf system.
 */
function init(options) {
	/**
	 * Function to be used as validator for file options. The actual value can be either false or of type 'string'.
	 */
	function validateFileOption(actual) {
		//Check if actual is 'false' or of type string.
		if(actual === false || typeof actual === 'string') {
			//The actual value is valid.

			//Return true to indicate this.
			return true;
		}

		//The actual value is invalid. Return false to indicate this.
		return false;
	}

	//Validate the options object.
	options = validate(options, {}, 'object');

	//Validate the options.arguments value. It should be a boolean and default to 'true'.
	options.argv = validate(options.argv, true, 'boolean');

	//Validate the options.config value. It should be a string and default to './config.json'.
	options.config = validate(options.config, './config.json', validateFileOption);

	//Validate the options.defaults value. It should be a string and default to './config_defaults.json'.
	options.defaults = validate(options.defaults, './config_defaults.json', validateFileOption);

	//Create a new nconf instance by creating a new Provider.
	var config = new nconf.Provider();

	//Check if argv should be read by nconf.
	if(options.argv === true) {
		//argv should be read by nconf.
		
		//Tell config to read argv as first priority.
		config.argv();
	}

	//Check if config file should be read by config.
	if(options.config !== false) {
		//A config file should be read by nconf.

		//Tell config to read from the config file as next priority.
		config.add('config', { type: 'file', file: options.config});
	}

	//Check if default config file should be read by config.
	if(options.defaults !== false) {
		//A default config file should be read by nconf.

		//Tell config to read from the default config file as next priority.
		config.add('defaults', { type: 'file', file: options.defaults});
	}

	//Return the initialized config object.
	return config;
}