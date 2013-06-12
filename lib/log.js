//-----------------------------------------------
// Dependencies
//-----------------------------------------------

//Require the winston module, which will handle all logging.
//URL: https://github.com/flatiron/winston
var winston = require('winston'); 

//Require the utils.validate function to validate options.
var validate = require('./utils.js').validate;

//-----------------------------------------------
// Exports
//-----------------------------------------------

//Expose the 'init' function.
exports.init = init;

//-----------------------------------------------
// Public functions
//-----------------------------------------------

/**
 * Initialize a new 'winston' object to handle logging.
 *
 * @param   {options}     Object to set behavior of 'Logger' object.
 * @option  {colorize}    If set to 'true' logging will be colorized. Default is 'true'.
 * @option  {timestamp}   If set to 'true' logging will be timestamped. Default is 'true'.
 * @option  {file}        If set to a filename, logging will be done written to the file. Default is 'false'.
 * @option  {console}     If set to 'true', logging will be done to the console. Default is 'true'.
 *
 * @return A new 'winston' instance configured by the 'options' given.
 *
 * Will throw on bad options or winston errors.
 */
function init(options) {
  //Check if the options object is defined
  if(options === undefined) {
    //No options defined.

    //Create an empty object so that the next checks will create the default values.
   options = {};
  }

  //Check if the 'colorize' option is defined.
  //If it is, it should be a boolean.
  if(options.colorize === undefined) {
    //No 'colorize' option defined.

    //Create a member of the option object to hold the default value.
    options.colorize = true;
  } else if(typeof options.colorize !== 'boolean') {
    //The 'colorize' option is defined but not the right type.

    //Throw an error.
    throw new Error('Illegal option type of colorize: ' + typeof options.colorize + '. Should be boolean.');
  }

  //Check if the 'timestamp' option is defined.
  //If it is, it should be a boolean.
  if(options.timestamp === undefined) {
    //No 'timestamp' option defined.

    //Create a member of the option object to hold the default value.
    options.timestamp = true;
  } else if(typeof options.timestamp !== 'boolean') {
    //The 'timestamp' option is defined but not the right type.

    //Throw an error.
    throw new Error('Illegal option type of timestamp: ' + typeof options.timestamp + '. Should be boolean.');
  }

  //Check if the 'console' option is defined.
  //If it is, it should be a boolean.l
  if(options.console === undefined) {
    //No 'console' option defined.

    //Create a member of the option object to hold the default value.
    options.console = true;
  } else if(typeof options.console !== 'boolean') {
    //The 'console' option is defined but not the right type.

    //Throw an error.
    throw new Error('Illegal option type of console: ' + typeof options.console + '. Should be boolean.');
  }

  //Check if the 'file' option is defined.
  //If it is, it should be a string.
  if(options.file === undefined) {
    //No 'file' option defined.

    //Create a member of the option object to hold the default value.
    options.file = false;
  } else if(typeof options.file !== 'string' && options.file !== false) {
    //The 'file' option is defined but not the right type.

    //Throw an error.
    throw new Error('Illegal option type of file: ' + typeof options.file + '. Should be string or false.');
  }

  //An array holder for all transports to be added to winston.
  var transports = [];

  //Check console logging.
  if(options.console === true) {
    //Logging should be done to console.

    //Create a new console transport and add it to the transports array.
    transports.push(new winston.transports.Console({
      colorize: options.colorize,     //Output colorized or not.
      timestamp: options.timestamp    //Logs should be timestamped or not.
    }));
  }

  //Check file logging.
  if(options.file !== false) {
    //Logging should be done to file.

    //Create a new file transport and add it to the transports array.
    transports.push(new (winston.transports.File)({
      filename: options.file,         //File to be logged to.
      colorize: options.colorize,     //Output colorized or not.
      timestamp: options.timestamp    //Logs should be timestamped or not.
    }));
  }

  //Initialize a new winston object with the defined transports.
  var logger = new (winston.Logger)({
    transports: transports,           //The transports to be used by winston.
  });

  //Return the newly created instance.
  return logger;
}