//Require the winston module, which will handle all logging.
var winston = require('winston');

//Require validator to validate config values.
var validator = require('validator');

//Require the config module, to read how log output should be handled.
var config = require('./config');

//Require the module that present the component info.
var info = require('./info');

//Init a new winston logging instance and export it.
module.exports = init();

//Will init winston to output to console and/or file(s) depending on config settings.
function init() {
	//An array holder for all transports to be added to winston.
	var transports = [];

	//Will hold boolean variable to tell the winston instance to colorize or not.
	var colorize;

	//Will hold boolean variable to tell the winston instance to timestamp or not.
	var timestamp;

	//Read the logs object of config.
	var logs = config.get('logs');

	//Here the validator will be used to check the validity of config values.
	//Read the colorize config value and require it to be a boolean.
	colorize = validator.sanitize(logs['colorize']).toBoolean();

	//Read the timestamp config value and require it to be a boolean.
	timestamp = validator.sanitize(logs['timestamp']).toBoolean();		

	//Read the log_to_file config value and require it to be a boolean.
	var logToFile = logs['log_to_file'];

	//Read the log_to_console config value and require it to be a boolean.
	var logToConsole = logs['log_to_console'];

	//Check console logging.
	if(logs['log_to_console'] === true) {
		//Logging should be done to console.

		//Create a new console transport and add it to the transports array.
		transports.push(new winston.transports.Console({
			colorize: colorize,			//Output colorized or not.
			timestamp: timestamp		//Logs should be timestamped or not.
		}));
	}

	//Check file logging.
	if(logToFile === true) {
		//Logging should be done to file.

		//Get the basedir for files.
		var basedir = logs['basedir'];

		//Validate config values.

		//basedir cannot be null and have to end with a '/' character.
		validator.check(basedir).notNull().is('.*/$');

		//Build the full path of the file to output the logs to.
		var file = basedir + info.getName() + '-' + info.getID() + '.log';

		//Create a new file transport and add it to the transports array.
		transports.push(new (winston.transports.File)({
			filename: file,				//File to be logged to.
			colorize: colorize,			//Output colorized or not.
			timestamp: timestamp		//Logs should be timestamped or not.
		}));
	}

	//Initialize a new winston object with the defined transports.
	var logger = new (winston.Logger)({
		transports: transports,		//The transports to be used by winston.
	});
	
	//If console logging is set to false, remove it from the logger object since it is
	//set to log to console as default.
	/*if(logToConsole === false) {
		//Logging to console is set to false.

		//Remove the console transport from the logger object.
		logger.remove(logger.transports.Console);
	}*/

	//Store the init function in the logger object so it can be reinitialized with new config values.
	//TODO: This is used in tests, might remove it when not testing.
	logger.init = init;

	//Return the logger.
	return logger;
};