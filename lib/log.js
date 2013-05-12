//Require the winston module, which will handle all logging.
var winston = require('winston');

//Require validator to validate config values.
var validator = require('validator');

//Require the config module, to read how log output should be handled.
var config = require('./config');

//Require the module that present the component info.
var info = require('./info');

//Set the defaults config of this module.
config.defaults({
	'logs': {
		'colorize': true,			//Logger should colorize output.
		'timestamp': true,			//Logger should timestamp output.
		'log_to_file': false,		//Logs will not be saved to file.
		'log_to_console': true		//Logs will be written to console.
	}
});

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
	try {
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

			//Get the variable that tells if logging should be divided into several files depending on log level or to a combined file.
			var combined = logs['combined'];

			//Validate config values.

			//basedir cannot be null and have to end with a '/' character.
			validator.check(basedir).notNull().is('.*/$');

			//Sanitize combined variable to boolean. This accepts string, int and boolean representation.
			combined = validator.sanitize(combined).toBoolean();

			//Check if logging should be combined.
			if(combined === true) {
				//Should be combined.

				//Build the full path of the file to output the logs to.
				var file = basedir + info.getName() + '-' + info.getID() + '.log';

				//Create a new file transport and add it to the transports array.
				transports.push(new (winston.transports.File({
					filename: file,				//File to be logged to.
					colorize: colorize,			//Output colorized or not.
					timestamp: timestamp		//Logs should be timestamped or not.
				})));
			} else {
				//Should be divided by log level.

				//Iterate over each log level and tell winston to append the log level to that file.
				for(var key in winston.levels) {
					//Build the full path of the file to output the logs to.
					var file = basedir + info.getName() + '-' + info.getID() + key + '.log';

					//Create a new file transport for the specific level and add it to the transports array.
					transports.push(new (winston.transports.File({
						filename: file,				//File to be logged to.
						colorize: colorize,			//Output colorized or not.
						timestamp: timestamp,		//Logs should be timestamped or not.
						levels: winston.levels[key]	//The level to be handled by this transport.
					})));
				}
			}			
		}
	} catch (e) {
		//An exception have occured due to malformated config data.

		//Output info to console.
		winston.log('error', 'Log init: Failed because of bad config values. Exception: %s', e.message, logs);

		//Kill the process.
		process.exit(1);
	}

	//Initialize a new winston object with the defined transports.
	return new (winston.Logger)({
		transports: transports,		//The transports to be used by winston.
	});
};